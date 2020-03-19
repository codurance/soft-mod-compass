const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const base64Encode = require('./encoding/base64')

const uploadPdfToS3AndSendEmail = require('./aws/uploadPdfToS3AndSendEmail')

module.exports = (config, reportingApp, buildInitialReportViewModelFor, buildReportViewModelFor, sendPdfLinkMail) => {
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
    res.render('index')
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
    const uuid = req.params.uuid
    const pdfLink = req.protocol + '://' + req.get('host') + `/report/${uuid}/Codurance%20Compass.pdf`

    sendPdfLinkMail(pdfLink, uuid)
    res.redirect(`${config.hubspot.thanksLandingPageUrl}?pdfLink=${pdfLink}`)
  })

  app.get('/report/:uuid/Codurance%20Compass.pdf', (req, res) => {
    generateReportAsync(req.params.uuid)
    res.redirect(config.hubspot.thanksLandingPageUrl)
  })

  async function generateReportAsync (uuid) {
    const template = {
      name: 'Compass',
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    }
    try {
      buildReportViewModelFor(uuid)
          .then(viewModel => {
            jsreport.render({ template, data: viewModel })
                .then(out => {
                  const email = getEmail(viewModel)
                  uploadPdfToS3AndSendEmail(email, out)
                })
          })
    } catch (e) {
      console.log(e.message || 'Internal Error')
    }
  }

  function getEmail (viewModel) {
    return viewModel.userData.values.find(d => d.name === 'email').value
  }

  return app
}
