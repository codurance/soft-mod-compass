import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import questionList from './config/QuestionnaireModel';
import translator from './config/translator';
import questionnaireMapper from './mappers/questionnaireMapper';
import redirectService from './services/redirectService';
import reportService from './services/reportService';

const submitSurveySpy = jest
  .spyOn(reportService, 'submitSurvey')
  .mockImplementation(() => Promise.resolve({ status: 'fake' }));

jest
  .spyOn(questionnaireMapper, 'generateQuestionnaire')
  .mockImplementation(() => Promise.resolve({ status: 'fake' }));

const {
  firstName,
  welcomeFirstParagraph,
  welcomeSecondParagraph,
  question,
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
  it('should display the Welcome component', () => {
    const { getByText } = render(<App />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });
  it('should display the first question', () => {
    const { getByText } = render(<App initialStep={1} />);

    expect(getByText(firstQuestion)).toBeInTheDocument();
    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(agree)).toBeInTheDocument();
    expect(getByText(neitherAgree)).toBeInTheDocument();
    expect(getByText(disagree)).toBeInTheDocument();
    expect(getByText(stronglyDisagree)).toBeInTheDocument();
  });

  it('should display the submit button', () => {
    const { getByText } = render(<App initialStep={2} />);
    expect(getByText(submit)).toBeInTheDocument();
  });

  it('should call submitSurvey service', () => {
    const { getByText } = render(<App initialStep={2} />);
    getByText(submit).click();
    expect(submitSurveySpy).toHaveBeenCalledTimes(1);
  });

  it('should call redirect after click on submit', (done) => {
    const { getByText } = render(<App initialStep={2} />);
    jest
      .spyOn(redirectService, 'redirect')
      .mockImplementation(() => assertAsyncCallbackIsCalled(done));
    getByText(submit).click();
  });

  it('should only display the Welcome component', () => {
    const { getByText, queryByText } = render(<App />);

    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(queryByText(question)).not.toBeInTheDocument();
    expect(queryByText(firstName)).not.toBeInTheDocument();
  });
});
