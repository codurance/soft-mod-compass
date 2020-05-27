const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const favicon = require('serve-favicon')
const socialMediaPreview = require('./socialMediaPreview');

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')

const uploadToS3 = require('./upload/uploadToS3')
const sendPdfLinkEmail = require('./mail/sendPdfLinkEmail')
const config = require('./config');
const jsReportTemplate = {
    name: config.isESVersion ? "Compass-ES" : "Compass-EN",
    engine: 'handlebars',
    recipe: 'chrome-pdf'
}


module.exports = (config, reportingApp, buildReportViewModelFor) => {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '/views'))
  app.use(stripHubspotSubmissionGuid)
  app.use(express.static('dist'))
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp)
  }

  app.get('/', (req, res) => {
    res.render('index', {
      typeformUrl: config.typeform.url,
      typeformFormId: config.typeform.formId,
      hubspotFormLandingPageUrl: config.hubspot.formLandingPageUrl,
      description: socialMediaPreview.getDescription(),
      title: socialMediaPreview.getTitle(),
      canonicalUrl: config.canonicalUrl
    })
  })

  app.get('/report/submit/:uuid', (req, res) => {
    generateReportAsync(req.params.uuid)
    res.redirect(config.hubspot.thanksLandingPageUrl)
  })

  function generateReportAsync (uuid) {
    buildReportViewModelFor(uuid)
      .then(viewModel => {
        jsreport.render({ template: jsReportTemplate, data: viewModel })
          .then(pdf => {
            const email = getEmail(viewModel)
            const firstname = getFirstname(viewModel)
            uploadPdfAndSendLinkEmail(pdf, { email, firstname })
          })
      })
  }

  function uploadPdfAndSendLinkEmail (pdf, userData) {
    uploadToS3(pdf, config.aws.bucket)
      .then(pdfLink => {
        console.log(`pdf available at ${pdfLink}`)
        sendPdfLinkEmail(pdfLink, userData)
      })
      .catch(err => console.log(`an error occurred while uploading the pdf\n${err}`))
  }

  function getEmail (viewModel) {
    return viewModel.userData.values.find(d => d.name === 'email').value
  }

  function getFirstname (viewModel) {
    return viewModel.userData.values.find(d => d.name === 'firstname').value
  }

  return app
}
