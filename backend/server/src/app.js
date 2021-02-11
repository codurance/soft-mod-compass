const express = require('express');
const bodyParser = require('body-parser');
const generateReport = require('./jsreportAdapter');
const cors = require('cors');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const handleGetSurveysByState = require('./dynamoDB/handleGetSurveysByState');
const handleCreateSurveys = require('./dynamoDB/dynamoCreateSurvey');
const handleUpdateSurvey = require('./dynamoDB/dynamoUpdateSurvey');
const { saveFailedSurvey } = require('./dynamoDB/dynamoCreateSurvey');

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
      .then((body) => {
        console.log('request successful with response :', body);
      })
      .catch((reason) => {
        handleInternalFailure(reason, req);
      });
    res.sendStatus(202);
    console.log('ready for new requests...');
  });

  function handleInternalFailure(reason, req) {
    console.error('error in request /surveys ', reason);
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

  //  ***************************************************
  //    POC store survey, get survey and updateSurvey
  //  ***************************************************

  app.get('/dynamodb/surveys/:state', (req, res) => {
    const { state } = req.params;
    handleGetSurveysByState(state)
      .then((body) => {
        res.send(body);
      })
      .catch((err) => {
        console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
        res.send({ status: 'Error', message: err.message });
      });
  });
  app.post('/dynamodb/surveys', (req, res) => {
    handleCreateSurveys(req.body).then((body) => res.send(body));
  });
  app.patch('/dynamodb/surveys', (req, res) => {
    const { id, surveyState } = req.body;
    handleUpdateSurvey(id, surveyState).then(() =>
      res.send({
        status: 'ok',
        message: `Survey with id ${id} has been updated, ${surveyState}`,
      })
    );
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
