const express = require('express');
const bodyParser = require('body-parser');
const generateReport = require('./jsreportAdapter');
const cors = require('cors');
const config = require('./config');

const {
  uploadReportToHubspot,
  submitHubspotForm,
} = require('./report/hubspot/uploadToHubspot');

module.exports = (reportingApp) => {
  console.log('config ', config);

  const app = express();

  app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp);
  }

  app.post('/surveys', (req, res) => {
    console.log('new request incoming...');
    handlePostRequest(req.body)
      .then((body) => {
        console.log('request successful with response :', body);
        res.send(body);
      })
      .catch((reason) => {
        console.error('error in request /surveys ', reason);
        res.status(500).send(reason);
      });
    console.log('ready for new requests...');
  });

  async function handlePostRequest(body) {
    const jsReportTemplate = {
      name: body.user.language === 'es' ? 'Compass-ES' : 'Compass-EN',
      engine: 'handlebars',
      recipe: 'chrome-pdf',
    };
    const pdf = await generateReport(jsReportTemplate, body);
    const pdfLink = await uploadReportToHubspot(pdf.content, body.user);
    const submittedUser = await submitHubspotForm(pdfLink, body.user);
    return { status: 'ok', ...submittedUser, pdfUrl: pdfLink };
  }

  return app;
};
