const nock = require('nock')
const request = require('supertest')
const mockSurveyQuestionsResponse = require('./mockData/surveyQuestionsResponse')
const mockSurveyAnswersResponse = require('./mockData/surveyAnswersResponse')

const app = require('../src/server/app')

describe('app', () => {
  it('responds with html on homepage', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })

  it('returns survey scores base64 encoded for transport to hubspot in query string', (done) => {
    const testUuid = '131696db-7092-45eb-a39d-79dc81e1f77f'

    nock('https://mashooqbadar.typeform.com', {
      reqheaders: {
        'authorization': 'Bearer 3U8FHS7YZV4GCpbwyxNUybKaAQAQZAzFyXoqCFeGqYRk'
      }
    })
      .get(`/forms/yiRLeY`)
      .reply(200, mockSurveyQuestionsResponse)

    nock('https://mashooqbadar.typeform.com', {
      reqheaders: {
        'authorization': 'Bearer 3U8FHS7YZV4GCpbwyxNUybKaAQAQZAzFyXoqCFeGqYRk'
      }
    })
      .get(`/forms/yiRLeY/responses?query=${testUuid}`)
      .reply(200, mockSurveyAnswersResponse)

    request(app)
      .get(`/scores/${testUuid}`)
      .expect(200, 'MjAsNDAsNjAsODAsMTAw', done)
  })
})
