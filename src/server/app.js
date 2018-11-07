const path = require('path')
const rp = require('request-promise')
const jsreport = require('jsreport')
const express = require('express')
const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
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
      scores: randomScores(),
      categories: fakeCategoryData()
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

function fakeCategoryData () {
  return [
    {
      'name': 'xp',
      'content': 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
      'score': 10
    },
    {
      'name': 'DevOps',
      'content': 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
      'score': 40
    },
    {
      'name': 'Cloud',
      'content': 'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
      'score': 90
    },
    {
      'name': 'Continuous Delivery',
      'content': 'Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.',
      'score': 30
    },
    {
      'name': 'culture',
      'content': 'Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
      'score': 50
    },
    {
      'name': 'TDD',
      'content': 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
      'score': 20
    }
  ]
}

module.exports = app
