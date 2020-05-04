const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const base64Encode = require('./encoding/base64')

const uploadToS3 = require('./upload/uploadToS3')
const sendPdfLinkEmail = require('./mail/sendPdfLinkEmail')

module.exports = (config, reportingApp, buildInitialReportViewModelFor, buildReportViewModelFor) => {
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
      hubspotFormLandingPageUrl: config.hubspot.formLandingPageUrl
    })
  })

  app.get('/scores/:uuid', cors(), (req, res) => {
    buildInitialReportViewModelFor(req.params.uuid).then(viewModel => {
      const scores = base64Encode(viewModel.scores.toString())
      const uuid = req.params.uuid
      const redirectUrl = `${config.hubspot.formLandingPageUrl}?uuid=${uuid}&scores=${scores}`
      res.redirect(redirectUrl)
    })
  })

  app.get('/report/submit/:uuid', (req, res) => {
    generateReportAsync(req.params.uuid)
    res.redirect(config.hubspot.thanksLandingPageUrl)
  })

  function generateReportAsync (uuid) {
    const template = {
      name: 'Compass',
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    }
    buildReportViewModelFor(uuid)
      .then(viewModel => {
        jsreport.render({ template, data: viewModel })
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
