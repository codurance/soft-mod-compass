import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import App from './App';
import payloadRequest from './mockdata/post_survey_request_body.json';
import reportService from './services/reportService';
import config from './config/config';

const userFirstName = 'First Name';
const userLastName = 'Last Name';
const userCompany = 'Some Company';
const userEmail = 'user@company.com';
const optionAnswer = 'Strongly Agree';
const successfulResponseFromBackend = { status: 'ok' };
config.reportServerBaseUrl = 'http://fake-report.com';
const SUBMIT_SURVEY_URI = '/surveys';
const firstPassedArgumentOf = (mockedFunction) =>
  mockedFunction.mock.calls[0][0];
const sentData = {
  firstName: userFirstName,
  lastName: userLastName,
  companyName: userCompany,
  email: userEmail,
  answer: {
    label: 'stronglyAgree',
    score: 100,
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
    const { getByText, getByLabelText } = render(<App />);
    // when I fill the survey and click on submit
    const answerChoice = getByText(optionAnswer);
    fireEvent.click(answerChoice);

    const inputFirstName = getByLabelText('First Name');
    fireEvent.change(inputFirstName, { target: { value: userFirstName } });

    const inputLastName = getByLabelText('Last Name');
    fireEvent.change(inputLastName, { target: { value: userLastName } });

    const inputCompany = getByLabelText('Company Name');
    fireEvent.change(inputCompany, { target: { value: userCompany } });

    const inputEmail = getByLabelText('Email');
    fireEvent.change(inputEmail, { target: { value: userEmail } });

    const button = getByText('Submit');
    fireEvent.click(button);

    // then
    const data = firstPassedArgumentOf(submitSurveySpy);
    expect(data).toEqual(sentData);
    const result = await returnFromAsync(submitSurveySpy);
    expect(result).toEqual(successfulResponseFromBackend);
  });
});
