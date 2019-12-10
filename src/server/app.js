const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const base64Encode = require('./encoding/base64')

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
    res.render('index')
  })

  app.get('/scores/:uuid', cors(), (req, res) => {
    console.log('CALLING TO GET INITIAL SCORES')

    buildInitialReportViewModelFor(req.params.uuid)
      .then(viewModel => {
        console.log('SENDING INITIAL SCORES')
        res.send(base64Encode(viewModel.scores.toString()))
      })
  })

  app.get('/report/:uuid/Codurance%20Compass.pdf', (req, res) => {
    console.log('CALLING FOR FULL DATA TO BUILD REPORT')

    buildReportViewModelFor(req.params.uuid)
      .then(viewModel => {
        console.log('RENDERING REPORT: RESULTS: ', viewModel)

        jsreport.render({
          template: {
            name: 'Compass',
            engine: 'handlebars',
            recipe: 'chrome-pdf'
          },
          data: viewModel
        }).then((out) => {
          out.stream.pipe(res)
        }).catch((e) => {
          res.end(e.message)
        })
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  })

  return app
}
