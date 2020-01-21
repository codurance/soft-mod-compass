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
    buildInitialReportViewModelFor(req.params.uuid).then(viewModel => {
      res.send(base64Encode(viewModel.scores.toString()))
    })
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
      out.stream.pipe(res)
    } catch (e) {
      console.log(e.message || 'Internal Error')
      res.end(e.message || 'Internal Error')
    }
  }

  return app
}
