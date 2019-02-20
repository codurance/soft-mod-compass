const config = {
  jsreport: {
    studioEditorEnabled: true
  },
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: 'encoded auth token'
  }
}

const typeformClient = require('../src/server/survey/typeformClient')(config)
const loadContent = require('../src/server/report/contentRepository')
const reportViewModelBuilder = require('../src/server/report/reportViewModelBuilder')(typeformClient, loadContent)

const nock = require('nock')
const request = require('supertest')
const mockSurveyQuestionsResponse = require('./mockData/surveyQuestionsResponse')
const mockSurveyAnswersResponse = require('./mockData/surveyAnswersResponse')

const fakeReportingApp = (req, res, next) => {
  return res.send('<p>jsreport studio</p>')
}

const app = require('../src/server/app')(config, fakeReportingApp, reportViewModelBuilder)

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
      jsreport: {
        studioEditorEnabled: false
      }
    }
    const app = require('../src/server/app')(fakeProdConfig, fakeReportingApp)
    request(app)
      .get('/reporting')
      .expect('Content-Type', /html/)
      .expect(404, done)
  })

  it('returns survey scores base64 encoded for transport to hubspot in query string', (done) => {
    const testUuid = '30749000-5a7b-4de7-b76f-297a84a6c72e'

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
      .expect(200, 'MTAwLDEwMCwxMDAsMTAwLDEwMA==', done)
  })
})
