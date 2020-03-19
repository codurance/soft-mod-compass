const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const base64Encode = require('./encoding/base64')

const sendEmail = require('./mail/sendEmail')

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const stream = require('stream')

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

  app.get('/report/:uuid/Codurance%20Compass.pdf', createReport)

  async function createReport (req, res) {
    const template = {
      name: 'Compass',
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    }
    try {
      const viewModel = await buildReportViewModelFor(req.params.uuid)
      const out = await jsreport.render({ template, data: viewModel })

      const successHandler = (data) => {
        const email = getUserEmail(viewModel)
        const pdfLink = data.Location

        console.log(`pdf available at ${pdfLink}`)
        sendEmail(email, pdfLink)
      }

      var pass = new stream.PassThrough()

      // Setting up S3 upload parameters
      const params = {
        Bucket: 'compass-pdf',
        Key: 'test.pdf', // File name you want to save as in S3
        Body: pass,
        ACL: 'public-read'
      };

      // Uploading files to the bucket
      s3.upload(params).promise()
          .then(successHandler)
          .catch(err => console.log(err))

      out.stream.pipe(pass)
      res.redirect(config.hubspot.thanksLandingPageUrl)
    } catch (e) {
      console.log(e.message || 'Internal Error')
      res.end(e.message || 'Internal Error')
    }
  }

  function getUserEmail (viewModel) {
  return viewModel.userData.values.find(d => d.name === 'email').value
}

  return app
}
