const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const reportViewModel = require('./reportViewModel')
const typeformClient = require('./typeformClient')

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
      const data = reportViewModel(categoryData(), choices, answers)

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

function categoryData () {
  return [
    {
      name: 'Organisational Maturity',
      subCategoryNames: ['DevSecOps', 'Delivering Value', 'Technical Debt', 'Well Defined Methodology'],
      low: 'low - organisatonal maturity',
      medium: 'medium - organisatonal maturity',
      high: 'high - organisatonal maturity'
    },
    {
      name: 'Continuous Deployment',
      subCategoryNames: ['Deployment cadence', 'Rework', 'Automated Pipeline', 'Confidence to develop without side effects'],
      low: 'low - CD',
      medium: 'medium - CD',
      high: 'high - CD'
    },
    {
      name: 'Culture',
      subCategoryNames: ['Transparency', 'Learning', 'Failure Is An opportunity to learn', 'Career Path'],
      low: 'low - culture',
      medium: 'medium - culture',
      high: 'high - culture'
    },
    {
      name: 'Cross-Functional Teams',
      subCategoryNames: ['Diversity', 'Autonomy', 'Whole Team', 'Bus factor'],
      low: 'low -  cross functional teams',
      medium: 'medium - cross functional teams',
      high: 'high - cross functional teams'
    },
    {
      name: 'XP Practices',
      subCategoryNames: ['TDD', 'Sustainable Pace', 'Pairing', 'Peer Review'],
      low: 'low -  XP',
      medium: 'medium - XP',
      high: 'high - XP'
    }
  ]
}

module.exports = app
