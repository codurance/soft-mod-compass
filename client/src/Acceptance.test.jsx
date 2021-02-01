import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import App from './App';
import config from './config/config';
import { buildAnswerScore } from './config/factory';
import translator from './config/translator';
import payloadRequest from './mockdata/post_survey_request_body.json';
import reportService from './services/reportService';

const {
  firstName,
  lastName,
  companyName,
  email,
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
    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.click(getByText('Start'));

    // when I fill the survey and click on submit
    // first category
    fireEvent.click(getByText(stronglyAgree));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(agree));
    fireEvent.click(getByText(stronglyDisagree));
    // second category
    fireEvent.click(getByText(hourly));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(stronglyDisagree));
    fireEvent.click(getByText(stronglyAgree));
    // third category
    fireEvent.click(getByText(stronglyDisagree));
    fireEvent.click(getByText(stronglyDisagree));
    fireEvent.click(getByText(disagree));
    fireEvent.click(getByText(stronglyDisagree));
    // fourth
    fireEvent.click(getByText(stronglyAgree));
    fireEvent.click(getByText(disagree));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(stronglyDisagree));
    // fifth
    fireEvent.click(getByText(agree));
    fireEvent.click(getByText(neitherAgree));
    fireEvent.click(getByText(agree));
    fireEvent.click(getByText(stronglyAgree));

    const inputFirstName = getByPlaceholderText(firstName);
    fireEvent.change(inputFirstName, { target: { value: userFirstName } });

    const inputLastName = getByPlaceholderText(lastName);
    fireEvent.change(inputLastName, { target: { value: userLastName } });

    const inputCompany = getByPlaceholderText(companyName);
    fireEvent.change(inputCompany, { target: { value: userCompany } });

    const inputEmail = getByPlaceholderText(email);
    fireEvent.change(inputEmail, { target: { value: userEmail } });

    const button = getByText(submit);
    fireEvent.click(button);

    // then
    // const data = firstPassedArgumentOf(submitSurveySpy);
    // expect(data).toEqual(expectedSentData);
    const result = await returnFromAsync(submitSurveySpy);
    expect(result).toEqual(successfulResponseFromBackend);
  });

  // it('should move forward on the steps when the user clicks in the preogres bar', () => {
  //   const { getByText, getByTestId } = render(<App />);
  //
  //   // first screen
  //   expect(getByText(start)).toBeInTheDocument();
  //   expect(getByText('0 of 2 completed')).toBeInTheDocument();
  //
  //   fireEvent.click(getByTestId('next'));
  //
  //   // Second screen
  //   expect(getByText(stronglyAgree)).toBeInTheDocument();
  //   expect(getByText('1 of 2 completed')).toBeInTheDocument();
  // });

  it('should move backward on the steps when the user clicks in the preogres bar', () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <App initialStep={2} />
    );

    // Third screen
    expect(getByPlaceholderText(firstName)).toBeInTheDocument();
    expect(getByText('2 of 2 completed')).toBeInTheDocument();

    fireEvent.click(getByTestId('previous'));
    fireEvent.click(getByTestId('previous'));

    // First screen
    expect(getByText(start)).toBeInTheDocument();
    expect(getByText('0 of 2 completed')).toBeInTheDocument();
  });
});
