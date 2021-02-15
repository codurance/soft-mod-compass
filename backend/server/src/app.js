const express = require('express');
const bodyParser = require('body-parser');
const generateReport = require('./jsreportAdapter');
const cors = require('cors');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const { updateToSucceedState } = require('./dynamoDB/dynamoUpdateSurvey');
const { saveFailedSurvey } = require('./dynamoDB/dynamoCreateSurvey');
const getSurveyById = require('./dynamoDB/getSurveyById');
const {
  uploadReportToHubspot,
  submitHubspotForm,
} = require('./report/hubspot/uploadToHubspot');

module.exports = (reportingApp) => {
  const app = express();
  if (config.cors.allowedOrigin)
    app.use(
      cors({
        origin: config.cors.allowedOrigin,
        methods: 'POST',
      })
    );
  // app.options('*', cors());
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp);
  }

  app.get('/', (req, res) => {
    res.status(200).send({ status: 'up' });
  });

  app.post('/surveys', (req, res) => {
    console.log('new request incoming... request body' + req.body);

    submitSurvey(req.body)
      .then((result) => {
        console.log('request successful :', result);
      })
      .catch((reason) => {
        handleInternalFailure(reason, req);
      });
    res.sendStatus(202);
    console.log('ready for new requests...');
  });

  app.patch('/surveys/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Reproccesing survey with id:' + id);
      const survey = await getSurveyById(id);
      await submitSurvey(survey.bodyRequest);
      await updateToSucceedState(id);
      res.status(200).send({ status: 'succeed', id });
    } catch (reason) {
      handleInternalFailure(reason, req);
      res.status(500).send({
        status: 'Error',
        message: `Error reproccesing the survey with id: ${id}`,
        id,
        surveyStatus: 'failed',
        reason,
      });
    }
  });

  function handleInternalFailure(reason, req) {
    console.error(`error in request ${req.method} ${req.uri} `, reason);
    saveFailedSurvey(req.body).then((id) =>
      console.log({
        failedSurvey: {
          surveyId: id,
          surveyRequestBody: req.body,
          errorDetails: reason,
        },
      })
    );
  }

  // allow to create failed survey (for testing only)
  app.post('/failed-surveys', (req, res) => {
    saveFailedSurvey(req.body).then((id) => {
      console.log({
        failedSurvey: {
          surveyId: id,
          surveyRequestBody: req.body,
          errorDetails: 'fake failure',
        },
      });
      res.send(id);
    });
  });

  function generatePdfLocally(pdfBuffer) {
    const pdfPath = path.join(__dirname, `../../tmp/test.pdf`);
    const route = path.join(__dirname, `../../tmp`);

    if (!fs.existsSync(route)) {
      fs.mkdirSync(route);
    }

    fs.writeFileSync(pdfPath, pdfBuffer, (err) =>
      console.log('Error generating the PDF', err.message)
    );
  }

  async function submitSurvey(body) {
    const jsReportTemplate = {
      name: body.user.language === 'es' ? 'Compass-ES' : 'Compass-EN',
      engine: 'handlebars',
      recipe: 'chrome-pdf',
    };
    const pdf = await generateReport(jsReportTemplate, body);

    if (process.env.LOCAL_MODE) {
      generatePdfLocally(pdf.content);
      return {
        status: 'ok',
        message: 'Your pdf was generated locally /server/tmp/test.pdf file',
      };
    } else {
      const pdfLink = await uploadReportToHubspot(pdf.content, body.user);
      const submittedUser = await submitHubspotForm(
        pdfLink,
        body.user,
        body.categories
      );
      return { status: 'ok', ...submittedUser, pdfUrl: pdfLink };
    }
  }

  return app;
};
