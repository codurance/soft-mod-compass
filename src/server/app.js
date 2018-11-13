const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const reportViewModel = require('./reportViewModel')
const typeformClient = require('./typeformClient')
const categoryData = require('./categoryData')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(stripHubspotSubmissionGuid)
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/report/:uuid', (req, res) => {
  Promise.all([typeformClient.getQuestionChoices(), typeformClient.surveyAnswersFor(req.params.uuid)])
    .then(([choices, answers]) => {
      const data = reportViewModel(categoryData, choices, answers)

      jsreport.render({
        template: {
          name: 'Compass',
          engine: 'handlebars',
          recipe: 'chrome-pdf'
        },
        data
      }).then((out) => {
        out.stream.pipe(res)
      }).catch((e) => {
        res.end(e.message)
      })
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

module.exports = app
