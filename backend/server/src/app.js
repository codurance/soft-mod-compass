const jsreport = require('jsreport');
const express = require('express');

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid');

const uploadToS3 = require('./upload/uploadToS3');
const sendPdfLinkEmail = require('./mail/sendPdfLinkEmail');
const config = require('./config');
const jsReportTemplate = {
  name: config.isESVersion ? 'Compass-ES' : 'Compass-EN',
  engine: 'handlebars',
  recipe: 'chrome-pdf',
};
const buildReportViewModelFor = require('./report/reportViewModelBuilder');
const uploadToHubspot = require('./report/hubspot/uploadToHubspot');

module.exports = (reportingApp) => {
  const app = express();

  // TODO: Investigate if this is still needed (since we extracted the client logic, it might be related)
  app.use(stripHubspotSubmissionGuid);

  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp);
  }

  app.get('/report/submit/:uuid', (req, res) => {
    generateAndSendReportAsync(req.params.uuid);
    res.redirect(config.hubspot.thanksLandingPageUrl);
  });

  app.get('/report/submit/:uuid', (req, res) => {
    handlePostRequest(req.params.uuid);
    res.redirect(config.hubspot.thanksLandingPageUrl);
  });

  async function generateAndSendReportAsync(uuid) {
    try {
      console.log('Generating report for:', uuid);

      const viewModel = await buildReportViewModelFor(uuid);

      const pdf = await jsreport.render({
        template: jsReportTemplate,
        data: viewModel,
      });
      console.log('pdf generated ', pdf);
      console.log(`Uploading report to S3 for '${uuid}'`);
      const pdfLink = await uploadToS3(pdf, config.aws.bucket);
      console.log(
        `Uploading report for '${uuid}' done. Pdf available at ${pdfLink}`
      );

      console.log(`Uploading report to Hubspot for '${uuid}'`);
      await uploadToHubspot(pdf.content, uuid);

      const userData = viewModel.user;
      await sendPdfLinkEmail(pdfLink, userData);
      console.log(`Email for '${uuid}' sent to '${userData.email}'`);
    } catch (e) {
      console.log('Error while processing report for:', uuid);
      console.log(e);
    }
  }

  return app;
};
