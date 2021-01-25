import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import translator from '../../config/translator';
import Questionnaire from './Questionnaire';

const {
  stronglyAgree,
  agree,
  neitherAgree,
  disagree,
  stronglyDisagree,
  question,
} = translator;

const initialState = {
  label: '',
  score: 0,
};

describe('Questionnaire', () => {
  it('should display the first question', () => {
    const { getByText } = render(
      <Questionnaire
        initialState={initialState}
        handleQuestionnaire={() => {}}
      />
    );
    expect(getByText(question)).toBeInTheDocument();
    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(agree)).toBeInTheDocument();
    expect(getByText(neitherAgree)).toBeInTheDocument();
    expect(getByText(disagree)).toBeInTheDocument();
    expect(getByText(stronglyDisagree)).toBeInTheDocument();
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
          initialState={initialState}
          handleQuestionnaire={() => {}}
        />
      );
      getByText(selectedAnswer).click();
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
