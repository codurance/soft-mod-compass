import { describe, expect, it, jest, afterEach } from '@jest/globals';
import nock from 'nock';
import config from '../config/config';
import surveyData from '../mockdata/survey_mock_data.json';
import reportService from './reportService';
import cookieService from './cookieService';
import ipProvider from './ipProvider';

import payloadRequest from '../mockdata/post_survey_request_body.json';

const nullCookiePayload = {
  ...payloadRequest,
  user: {
    ...payloadRequest.user,
    hutk: null,
  },
};

const successfulResponseFromBackend = { status: 'ok' };
config.reportServerBaseUrl = 'http://fake-report.com';
nock(config.reportServerBaseUrl).post('/surveys', payloadRequest).reply(201);
nock(config.reportServerBaseUrl).post('/surveys', nullCookiePayload).reply(201);

const ipProviderSpy = jest
  .spyOn(ipProvider, 'getIp')
  .mockImplementation(() => Promise.resolve('mockedIp'));
const getCookieSpy = jest.spyOn(cookieService, 'getCookie');

describe('report service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should returns successful response when we submit a survey', async () => {
    getCookieSpy.mockImplementation(() => 'hubspotutkCookie');

    const response = await reportService.submitSurvey(surveyData);

    expect(response).toEqual(successfulResponseFromBackend);
    expect(ipProviderSpy).toHaveBeenCalledTimes(1);
    expect(getCookieSpy).toHaveBeenCalledTimes(1);
  });

  it('should returns successful response when we submit a survey with a null cookie', async () => {
    getCookieSpy.mockImplementation(() => null);

    const response = await reportService.submitSurvey(surveyData);

    expect(response).toEqual(successfulResponseFromBackend);
    expect(ipProviderSpy).toHaveBeenCalledTimes(1);
    expect(getCookieSpy).toHaveBeenCalledTimes(1);
  });
});
