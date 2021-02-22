import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent } from '@testing-library/dom';
import { act, render } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { config as reactTransitionGroupConfig } from 'react-transition-group';
import AppRouter from './AppRouter';
import config from './config/config';
import { buildAnswerScore } from './config/factory';
import translator from './config/translator';
import payloadRequest from './mockdata/post_survey_request_body.json';
import testHelpers from './mockdata/testHelpers';
import reportService from './services/reportService';
import ipProvider from './services/ipProvider';

reactTransitionGroupConfig.disabled = true;

const {
  submit,
  start,
  stronglyAgree,
  neitherAgree,
  stronglyDisagree,
  agree,
  hourly,
  disagree,
} = translator;

const userFirstName = 'First Name';
const userLastName = 'Last Name';
const userCompany = 'Some Company';
const userEmail = 'user@company.com';
const successfulResponseFromBackend = { status: 'ok' };
config.reportServerBaseUrl = 'http://fake-report.com';
const SUBMIT_SURVEY_URI = '/surveys';
const firstPassedArgumentOf = (mockedFunction) =>
  mockedFunction.mock.calls[0][0];
const expectedSentData = {
  firstName: userFirstName,
  lastName: userLastName,
  companyName: userCompany,
  email: userEmail,
  questionnaire: {
    devSecOps: buildAnswerScore('stronglyAgree', 100),
    deliveringValue: buildAnswerScore('neitherAgree', 60),
    technicalDebt: buildAnswerScore('agree', 80),
    methodology: buildAnswerScore('stronglyDisagree', 20),
  },
};
const submitSurveySpy = jest.spyOn(reportService, 'submitSurvey');
const ipProviderSpy = jest
  .spyOn(ipProvider, 'getIp')
  .mockImplementation(() => Promise.resolve('mockedIp'));
const returnFromAsync = (spy) => spy.mock.results[0].value;

/*
Given a user load compass survey
When the user choose "Strongly Agree" in the question
And the user fill his details (names, company, email)
And the user hits submit
Then the following POST request should be sent (look json file attached)
Then the user is redirected to thank you page
 */
describe('acceptance test', () => {
  nock(config.reportServerBaseUrl)
    .post(SUBMIT_SURVEY_URI, payloadRequest)
    .reply(201);

  it('should submit information about the survey', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <AppRouter />
    );
    fireEvent.click(getByText(start));

    // when I fill the survey and click on submit
    // first category
    fireEvent.click(getByText(stronglyAgree));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(agree));
    fireEvent.click(getByText(stronglyDisagree));
    // second category
    fireEvent.click(getByText(stronglyAgree));
    fireEvent.click(getByText(disagree));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(stronglyDisagree));

    // third category
    fireEvent.click(getByText(hourly));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(stronglyDisagree));
    fireEvent.click(getByText(stronglyAgree));
    // fourth
    fireEvent.click(getByText(agree));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(agree));
    fireEvent.click(getByText(stronglyAgree));

    // fifth
    fireEvent.click(getByText(stronglyDisagree));
    fireEvent.click(getByText(stronglyDisagree));
    fireEvent.click(getByText(disagree));
    fireEvent.click(getByText(stronglyDisagree));

    testHelpers.fillUserForm(getByPlaceholderText, getByTestId);
    await act(async () => {
      fireEvent.click(getByText(submit));
    });
    // then
    // const data = firstPassedArgumentOf(submitSurveySpy);
    // expect(data).toEqual(expectedSentData);
    const result = await returnFromAsync(submitSurveySpy);
    expect(result).toEqual(successfulResponseFromBackend);
    expect(ipProviderSpy).toHaveBeenCalledTimes(1);
  });
});
