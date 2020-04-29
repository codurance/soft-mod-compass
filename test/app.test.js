const config = {
  jsreport: {
    studioEditorEnabled: true
  },
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: 'encoded auth token'
  },
  hubspot: {
    formLandingPageUrl: 'https://hubspot.com/form'
  }
}

const typeformClient = require('../src/server/survey/typeformClient')(config)
const loadContent = require('../src/server/report/contentRepository')
const loadStaticContent = require('../src/server/report/staticContentRepository')
const reportViewModelBuilder = require('../src/server/report/reportViewModelBuilder')(typeformClient, loadContent, loadStaticContent)

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
})
