import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import Questionnaire from './Questionnaire';

const {
  stronglyAgree,
  agree,
  neitherAgree,
  disagree,
  stronglyDisagree,
} = translator;

const firstQuestion = translator[questionList[0].label];
const secondQuestion = translator[questionList[1].label];
describe('Questionnaire', () => {
  it('should display only the first question at initial step', () => {
    const { getByText, queryByText } = render(
      <Questionnaire
        onFinishQuestionnaire={() => {}}
        onUpdateQuestionnaire={() => {}}
      />
    );
    expect(getByText(firstQuestion)).toBeInTheDocument();
    expect(queryByText(secondQuestion)).not.toBeInTheDocument();
  });

  it('should display the second question and hide first question after answering first question', () => {
    const { getByText, queryByText } = render(
      <Questionnaire
        onFinishQuestionnaire={() => {}}
        onUpdateQuestionnaire={() => {}}
      />
    );

    getByText(stronglyAgree).click();
    expect(getByText(secondQuestion)).toBeInTheDocument();
    expect(queryByText(firstQuestion)).not.toBeInTheDocument();
  });

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
      const { getByTestId, getByText } = render(
        <Questionnaire
          onFinishQuestionnaire={() => {}}
          onUpdateQuestionnaire={() => {}}
        />
      );
      getByTestId(selectedAnswer).click();
      getByText('Prev').click();
      answers.forEach((answer) => {
        if (selectedAnswer === answer) {
          expect(getByTestId(answer)).toHaveClass('answer--selected');
        } else {
          expect(getByTestId(answer)).not.toHaveClass('answer--selected');
        }
      });
    }
  );

  it('first category should has organisationalMaturity background', () => {
    const { getByTestId } = render(
      <Questionnaire
        onFinishQuestionnaire={() => {}}
        onUpdateQuestionnaire={() => {}}
      />
    );
    const firstCategory = questionList[0].category;

    expect(getByTestId(`background-${firstCategory}`)).toHaveClass(
      `questionnaire__assessment--${firstCategory}`
    );
  });

  it('second category should has crossFunctionalTeams background', () => {
    const { getByTestId, getByText } = render(
      <Questionnaire
        onFinishQuestionnaire={() => {}}
        onUpdateQuestionnaire={() => {}}
      />
    );
    const secondCategory = questionList[5].category;

    // Advance to the second category
    getByText(stronglyDisagree).click();
    getByText(stronglyDisagree).click();
    getByText(disagree).click();
    getByText(stronglyDisagree).click();

    expect(getByTestId(`background-${secondCategory}`)).toHaveClass(
      `questionnaire__assessment--${secondCategory}`
    );
  });
});
