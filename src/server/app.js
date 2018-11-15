const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const buildReportViewModelFor = require('./reportViewModelBuilder')
const base64Encode = require('./encoding/base64')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(stripHubspotSubmissionGuid)
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/scores/:uuid', (req, res) => {
  buildReportViewModelFor(req.params.uuid)
    .then(viewModel => {
      res.send(base64Encode(viewModel.summaryRadial.scores.toString()))
    })
})

app.get('/report/:uuid', (req, res) => {
  buildReportViewModelFor(req.params.uuid)
    .then(viewModel => {
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
})

module.exports = app
