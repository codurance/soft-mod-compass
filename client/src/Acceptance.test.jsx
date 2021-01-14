import { render } from '@testing-library/react';
import React from 'react';
import { fireEvent } from '@testing-library/dom';
import {
  describe, it, jest, expect,
} from '@jest/globals';
import nock from 'nock';
import reportService from './services/reportService';
import App from './App';
import payloadRequest from './mockdata/post_survey_request_body.json';

const userFirstName = 'FIRSTNAME';
const userLastName = 'LASTNAME';
const userCompany = 'COMPANY';
const userEmail = 'user@mail.com';
const successfulResponseFromBackend = { status: 'ok' };
const REPORT_BACKEND_URL = 'compass.codurance.io';
const SUBMIT_SURVEY_URI = '/surveys';
/*
Given a user load compass survey
When the user choose "Strongly Agree" in the question
And the user fill his details (names, company, email)
And the user hits submit
Then the following POST request should be sent (look json file attached)
Then the user is redirected to thank you page
 */
describe('acceptance test', () => {
  nock(REPORT_BACKEND_URL)
    .post(SUBMIT_SURVEY_URI, payloadRequest)
    .reply(201);

  it('should submit information about the survey', () => {
    const { getByText, getByLabelText } = render(<App />);
    // when I fill the survey and click on submit
    const answerChoice = getByText('Strongly Agree');
    fireEvent.click(answerChoice);

    const inputFirstName = getByLabelText('firstName');
    fireEvent.change(inputFirstName, { target: { value: userFirstName } });

    const inputLastName = getByLabelText('lastName');
    fireEvent.change(inputLastName, { target: { value: userLastName } });

    const inputCompany = getByLabelText('company');
    fireEvent.change(inputCompany, { target: { value: userCompany } });

    const inputEmail = getByLabelText('email');
    fireEvent.change(inputEmail, { target: { value: userEmail } });

    const button = getByText('submit');
    fireEvent.click(button);

    // then
    const spy = jest.spyOn(reportService, 'submitSurvey');
    expect(spy).toReturnWith(Promise.resolve(successfulResponseFromBackend));
  });
});
