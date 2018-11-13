const path = require('path')
const rp = require('request-promise')
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

app.get('/results', (req, res) => {
  const respondentId = req.query.id
  const formId = 'yiRLeY'
  const authToken = '3U8FHS7YZV4GCpbwyxNUybKaAQAQZAzFyXoqCFeGqYRk'

  const options = {
    uri: `https://api.typeform.com/forms/${formId}/responses`,
    qs: {
      query: respondentId
    },
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  }

  rp(options)
    .then(function (response) {
      const answers = response.items[0].answers
      console.log(answers)
    })
    .catch(function () {
      console.log('oh snap!')
    })

  res.render('results', { data: [40, 10, 50, 30, 70, 40] })
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

app.get('/test-data', (req, res) => {
  res.json({
    scores: randomScores()
  })
})

function randomScores () {
  return [...Array(5)].map(i => Math.round(Math.random() * 100))
}

function categoryData () {
  return [
    {
      name: 'Organisational Maturity',
      low: 'low - organisatonal maturity',
      medium: 'medium - organisatonal maturity',
      high: 'high - organisatonal maturity'
    },
    {
      name: 'Continuous Deployment',
      low: 'low - CD',
      medium: 'medium - CD',
      high: 'high - CD'
    },
    {
      name: 'Culture',
      low: 'low - culture',
      medium: 'medium - culture',
      high: 'high - culture'
    },
    {
      name: 'Cross-Functional Teams',
      low: 'low -  cross functional teams',
      medium: 'medium - cross functional teams',
      high: 'high - cross functional teams'
    },
    {
      name: 'XP Practices',
      low: 'low -  XP',
      medium: 'medium - XP',
      high: 'high - XP'
    }
  ]
}

module.exports = app
