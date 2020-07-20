const path = require('path');
const jsreport = require('jsreport');
const express = require('express');
const favicon = require('serve-favicon');
const socialMediaPreview = require('./socialMediaPreview');

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid');

const uploadToS3 = require('./upload/uploadToS3');
const sendPdfLinkEmail = require('./mail/sendPdfLinkEmail');
const cookieMessage = require('./cookieMessage');
const config = require('./config');
const jsReportTemplate = {
  name: config.isESVersion ? 'Compass-ES' : 'Compass-EN',
  engine: 'handlebars',
  recipe: 'chrome-pdf',
};
const buildReportViewModelFor = require('./report/reportViewModelBuilder');

module.exports = (reportingApp) => {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/views'));
  app.use(stripHubspotSubmissionGuid);
  app.use(express.static('dist'));
  app.use(express.static(__dirname + '/public')); ///////////////////////////////////////////////////// should css be put here?
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp);
  }

  app.get('/', (req, res) => {
    res.render('index', {
      typeformUrl: config.typeform.url,
      typeformFormId: config.typeform.formId,
      hubspotFormLandingPageUrl: config.hubspot.formLandingPageUrl,
      description: socialMediaPreview.getDescription(),
      title: socialMediaPreview.getTitle(),
      canonicalUrl: config.canonicalUrl,
      cookieMessage: cookieMessage,
    });
  });

  app.get('/report/submit/:uuid', (req, res) => {
    console.log('Generating report for:', req.params.uuid);
    generateAndSendReportAsync(req.params.uuid);
    res.redirect(config.hubspot.thanksLandingPageUrl);
  });

  async function generateAndSendReportAsync(uuid) {
    try {
      const viewModel = await buildReportViewModelFor(uuid);

      const pdf = await jsreport.render({
        template: jsReportTemplate,
        data: viewModel,
      });

      console.log(`Uploading report for '${uuid}'`);
      const pdfLink = await uploadToS3(pdf, config.aws.bucket);
      console.log(
        `Uploading report for '${uuid}' done. Pdf available at ${pdfLink}`
      );

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
