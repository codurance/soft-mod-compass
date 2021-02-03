import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import translator from '../../config/translator';
import Questionnaire from './Questionnaire';
import questionList from '../../config/QuestionnaireModel';

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
      const { getByText } = render(
        <Questionnaire
          onFinishQuestionnaire={() => {}}
          onUpdateQuestionnaire={() => {}}
        />
      );
      getByText(selectedAnswer).click();
      getByText('back').click();
      answers.forEach((answer) => {
        if (selectedAnswer === answer) {
          expect(getByText(answer)).toHaveClass('answer--selected');
        } else {
          expect(getByText(answer)).not.toHaveClass('answer--selected');
        }
      });
    }
  );
});
