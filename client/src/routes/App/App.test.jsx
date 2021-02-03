import { describe, expect, it, jest } from '@jest/globals';
import { act, render } from '@testing-library/react';
import React from 'react';
import { fireEvent } from '@testing-library/dom';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import questionnaireMapper from '../../mappers/questionnaireMapper';
import redirectService from '../../services/redirectService';
import reportService from '../../services/reportService';
import App from './App';
import testHelpers from '../../mockdata/testHelpers';

const { firstName, lastName, companyName, email } = translator;

const submitSurveySpy = jest
  .spyOn(reportService, 'submitSurvey')
  .mockImplementation(() => Promise.resolve({ status: 'fake' }));

jest
  .spyOn(questionnaireMapper, 'generateQuestionnaire')
  .mockImplementation(() => Promise.resolve({ status: 'fake' }));

const {
  stronglyAgree,
  agree,
  neitherAgree,
  disagree,
  stronglyDisagree,
  submit,
} = translator;

function assertAsyncCallbackIsCalled(done) {
  done();
}
const firstQuestion = translator[questionList[0].label];

describe('app', () => {
  it('should display the first question', () => {
    const { getByText } = render(<App initialStep={0} />);

    expect(getByText(firstQuestion)).toBeInTheDocument();
    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(agree)).toBeInTheDocument();
    expect(getByText(neitherAgree)).toBeInTheDocument();
    expect(getByText(disagree)).toBeInTheDocument();
    expect(getByText(stronglyDisagree)).toBeInTheDocument();
  });

  it('should display progress bar without completed stages', () => {
    const { getByTestId } = render(<App initialStep={0} />);

    questionList.forEach((question) => {
      expect(getByTestId(question.category)).toBeInTheDocument();
      expect(getByTestId(question.label)).not.toHaveClass(
        'progress-bar__step--completed'
      );
    });
  });

  it('should display progress bar with one completed stage', () => {
    const { getByTestId, getByText } = render(<App initialStep={0} />);

    getByText(stronglyAgree).click();
    questionList.forEach((question, index) => {
      if (index === 0) {
        expect(getByTestId(question.category)).toBeInTheDocument();
        expect(getByTestId(question.label)).toHaveClass(
          'progress-bar__step--completed'
        );
      } else {
        expect(getByTestId(question.category)).toBeInTheDocument();
        expect(getByTestId(question.label)).not.toHaveClass(
          'progress-bar__step--completed'
        );
      }
    });
  });

  it('should display the submit button', () => {
    const { getByText } = render(<App initialStep={1} />);
    expect(getByText(submit)).toBeInTheDocument();
  });

  it('should call submitSurvey service', async () => {
    const { getByText, getByPlaceholderText } = render(<App initialStep={1} />);
    testHelpers.fillUserForm(getByPlaceholderText);
    await act(async () => {
      fireEvent.click(getByText(submit));
    });
    expect(submitSurveySpy).toHaveBeenCalledTimes(1);
  });

  it('should call redirect after click on submit', (done) => {
    const { getByText, getByPlaceholderText } = render(<App initialStep={1} />);
    jest
      .spyOn(redirectService, 'redirect')
      .mockImplementation(() => assertAsyncCallbackIsCalled(done));

    testHelpers.fillUserForm(getByPlaceholderText);
    getByText(submit).click();
  });
});
