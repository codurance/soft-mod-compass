const express = require('express');
const bodyParser = require('body-parser');
const generateReport = require('./jsreportAdapter');
const cors = require('cors');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const {
  uploadReportToHubspot,
  submitHubspotForm,
} = require('./report/hubspot/uploadToHubspot');

module.exports = (reportingApp) => {
  console.log('config ', config);

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
    console.log('new request incoming...');
    handlePostRequest(req.body)
      .then((body) => {
        console.log('request successful with response :', body);
        res.send(body);
      })
      .catch((reason) => {
        console.error('error in request /surveys ', reason);
        res.status(500).send(reason.message);
      });
    console.log('ready for new requests...');
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

  async function handlePostRequest(body) {
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
      const submittedUser = await submitHubspotForm(pdfLink, body.user);
      return { status: 'ok', ...submittedUser, pdfUrl: pdfLink };
    }
  }

  return app;
};
