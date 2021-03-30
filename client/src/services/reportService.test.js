import { describe, expect, it, jest } from '@jest/globals';
import nock from 'nock';
import config from '../config/config';
import payloadRequest from '../mockdata/post_survey_request_body.json';
import surveyData from '../mockdata/survey_mock_data.json';
import reportService from './reportService';
import cookieService from './cookieService';
import ipProvider from './ipProvider';

const successfulResponseFromBackend = { status: 'ok' };
config.reportServerBaseUrl = 'http://fake-report.com';
nock(config.reportServerBaseUrl)
  .post('/surveys', JSON.stringify(payloadRequest))
  .reply(201);

const ipProviderSpy = jest
  .spyOn(ipProvider, 'getIp')
  .mockImplementation(() => Promise.resolve('mockedIp'));

const getCookieSpy = jest
  .spyOn(cookieService, 'getCookie')
  .mockImplementation(() => 'hubspotutkCookie');

describe('report service', () => {
  it('should returns successful response when we submit a survey', async () => {
    const response = await reportService.submitSurvey(surveyData);

    expect(response).toEqual(successfulResponseFromBackend);
    expect(ipProviderSpy).toHaveBeenCalledTimes(1);
    expect(getCookieSpy).toHaveBeenCalledTimes(1);
  });
});
