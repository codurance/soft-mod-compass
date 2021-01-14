import { render } from '@testing-library/react';
import React from 'react';
import {
  beforeEach, describe, it, jest,
} from '@jest/globals';
import App from './App';

const payloadRequest = { data: '' };

/*
Given a user load compass survey
When the user choose "Strongly Agree" in the question
And the user fill his details (names, company, email)
And the user hits submit
Then the following POST request should be sent (look json file attached)
 */
describe('acceptance test', () => {
  const submitSurvey = jest.fn();
  jest.doMock('./services/reportService', () => ({
    submitSurvey,
  }));
  const reportService = require('./services/reportService');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads and displays greeting', () => {
    // jest.spyOn(reportService, 'submitSurvey');
    // failure Promise.reject(new Error('fail'))
    // success new Promise((resolve) => resolve(getMockResponse()));

    submitSurvey.mockReturnValue(1);

    const returnedValue = reportService.submitSurvey(payloadRequest);
    console.log('returned value ', returnedValue);
    const app = render(<App />);
    // app.getByText("Hello World!")

    // when I fill the survey and click on submit

    // then
    // expect(reportService.submitSurvey).toBeCalledWith(payloadRequest)
    app.getByText('Thank you for submit compass !');
    app.getByText('an error occurred !');
  });
});
