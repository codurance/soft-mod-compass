import nock from 'nock'
import payloadRequest from '../mockdata/post_survey_request_body.json'
import surveyData from '../mockdata/survey_mock_data.json'
import reportService from './reportService'

const successfulResponseFromBackend = { status: 'ok' };
process.env.REACT_APP_REPORT_SERVICE_URL = 'http://fake-report.com';

nock(process.env.REACT_APP_REPORT_SERVICE_URL).post('/surveys', JSON.stringify(payloadRequest)).reply(201)

describe('report service', () => {
  it('should returns successful response when we submit a survey', async () => {

    const response = await reportService.submitSurvey(surveyData)

    expect(
      response
    ).toEqual(successfulResponseFromBackend)

  })
})
