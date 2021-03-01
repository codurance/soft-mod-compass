import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, waitFor } from '@testing-library/dom';
import { act, render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import { config as reactTransitionGroupConfig } from 'react-transition-group';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import questionnaireMapper from '../../mappers/questionnaireMapper';
import testHelpers from '../../mockdata/testHelpers';
import redirectService from '../../services/redirectService';
import reportService from '../../services/reportService';
import App from './App';

reactTransitionGroupConfig.disabled = true;

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
const secondQuestion = translator[questionList[1].label];

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <App initialStep={1} />
    );
    testHelpers.fillUserForm(getByPlaceholderText, getByTestId);
    await act(async () => {
      fireEvent.click(getByText(submit));
    });
    expect(submitSurveySpy).toHaveBeenCalledTimes(1);
  });

  it('should call redirect after click on submit', (done) => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <App initialStep={1} />
    );
    jest
      .spyOn(redirectService, 'redirect')
      .mockImplementation(() => assertAsyncCallbackIsCalled(done));

    testHelpers.fillUserForm(getByPlaceholderText, getByTestId);
    getByText(submit).click();
  });

  it('should display the second question and hide first question after answering first question', async () => {
    const { getByText, queryByText } = render(<App initialStep={0} />);

    getByText(stronglyAgree).click();
    await waitFor(() => {
      expect(getByText(secondQuestion)).toBeInTheDocument();
      expect(queryByText(firstQuestion)).not.toBeInTheDocument();
    });
  });

  it('should not display the next and back button on first question', () => {
    const { queryByText } = render(<App initialStep={0} />);

    expect(queryByText('Next')).not.toBeInTheDocument();
    expect(queryByText('Back')).not.toBeInTheDocument();
  });

  it('should display the back but not next button on second question when only first question has been chosen', () => {
    const { queryByText, getByText } = render(<App initialStep={0} />);
    getByText(stronglyAgree).click();
    expect(queryByText('Next')).not.toBeInTheDocument();
    expect(queryByText('Prev')).toBeInTheDocument();
  });

  // it('should display the back but not next button on the user form', () => {
  //   const { queryByText, getByText } = render(<App initialStep={0} />);
  //   getByText(stronglyAgree).click();
  //   expect(queryByText(translator.userFormTitle)).toBeInTheDocument();
  //   expect(queryByText('Prev')).not.toBeInTheDocument();
  //   expect(queryByText('Next')).not.toBeInTheDocument();
  // });

  const answerTable = [
    stronglyAgree,
    agree,
    neitherAgree,
    disagree,
    stronglyDisagree,
  ];
  each([
    [stronglyAgree, answerTable],
    [agree, answerTable],
    [neitherAgree, answerTable],
    [disagree, answerTable],
    [stronglyDisagree, answerTable],
  ]).it(
    "given an answer '%s' , only that one should be selected",
    (selectedAnswer, answers) => {
      const { getByTestId, getByText } = render(<App initialStep={0} />);

      getByTestId(selectedAnswer).click();
      getByText('Prev').click();
      answers.forEach((answer) => {
        setTimeout(() => {
          if (selectedAnswer === answer) {
            expect(getByTestId(answer)).toHaveClass('answer--selected');
          } else {
            expect(getByTestId(answer)).not.toHaveClass('answer--selected');
          }
        }, 800);
      });
    }
  );

  it('should have the category background related to the question', () => {
    const { getByTestId } = render(<App initialStep={0} />);
    const firstCategory = questionList[0].category;

    expect(getByTestId(`app--${firstCategory}`)).toHaveClass(
      `app--${firstCategory}`
    );
  });

  it('should have the compass background when app displays the user form', () => {
    const { getByTestId } = render(<App initialStep={1} />);

    expect(getByTestId(`app--compass`)).toHaveClass(`app--compass`);
  });
});
