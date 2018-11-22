const nock = require('nock')
const request = require('supertest')
const mockSurveyQuestionsResponse = require('./mockData/surveyQuestionsResponse')
const mockSurveyAnswersResponse = require('./mockData/surveyAnswersResponse')

const config = {
  environment: {
    development: true
  },
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: 'encoded auth token'
  }
}

const fakeReportingApp = (req, res, next) => {
  return res.send('<p>jsreport studio</p>')
}

const app = require('../src/server/app')(config, fakeReportingApp)

describe('app', () => {
  it('responds with html on homepage', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })

  it('allows access to jsreport studio locally in development', (done) => {
    request(app)
      .get('/reporting')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })

  it('does not allow access to jsreport studio in production', (done) => {
    const fakeProdConfig = {
      ...config,
      environment: {
        development: false
      }
    }
    const app = require('../src/server/app')(fakeProdConfig, fakeReportingApp)
    request(app)
      .get('/reporting')
      .expect('Content-Type', /html/)
      .expect(404, done)
  })

  it('returns survey scores base64 encoded for transport to hubspot in query string', (done) => {
    const testUuid = '131696db-7092-45eb-a39d-79dc81e1f77f'

    nock(config.typeform.url, {
      reqheaders: {
        'authorization': `Bearer ${config.typeform.authToken}`
      }
    })
      .get(`/forms/${config.typeform.formId}`)
      .reply(200, mockSurveyQuestionsResponse)

    nock(config.typeform.url, {
      reqheaders: {
        'authorization': `Bearer ${config.typeform.authToken}`
      }
    })
      .get(`/forms/${config.typeform.formId}/responses?query=${testUuid}`)
      .reply(200, mockSurveyAnswersResponse)

    request(app)
      .get(`/scores/${testUuid}`)
      .expect(200, 'MjAsNDAsNjAsODAsMTAw', done)
  })
})
