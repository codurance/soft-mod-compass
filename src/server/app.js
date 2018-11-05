const path = require('path')
const rp = require('request-promise')
const jsreport = require('jsreport')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/results', (req, res) => {
  const respondentId = req.query.id
  const formId = 'Lks1RA'
  const authToken = 'A4ertXpQ7ieS26cUM5H1odoeaBR8NTnMSGCkSDKPcsNZ'

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
  jsreport.render({
    template: {
      name: 'Compass',
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    },
    data: {
      uuid: req.params.uuid,
      scores: randomScores()
    }
  }).then((out) => {
    out.stream.pipe(res)
  }).catch((e) => {
    res.end(e.message)
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

module.exports = app
