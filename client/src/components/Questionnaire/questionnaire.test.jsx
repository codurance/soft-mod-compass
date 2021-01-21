import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import Questionnaire from './Questionnaire';

const stronglyAgree = 'Strongly Agree';
const Agree = 'Agree';
const NeitherAgree = 'Neither Agree Nor Disagree';
const Disagree = 'Disagree';
const StronglyDisagree = 'Strongly Disagree';
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
    expect(
      getByText(
        'Decision making for IT product and projects is based on what will carry the most value for the business. *'
      )
    ).toBeInTheDocument();
    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(Agree)).toBeInTheDocument();
    expect(getByText(NeitherAgree)).toBeInTheDocument();
    expect(getByText(Disagree)).toBeInTheDocument();
    expect(getByText(StronglyDisagree)).toBeInTheDocument();
  });

  const answerTable = [
    stronglyAgree,
    Agree,
    NeitherAgree,
    Disagree,
    StronglyDisagree,
  ];
  each([
    [stronglyAgree, answerTable],
    [Agree, answerTable],
    [NeitherAgree, answerTable],
    [Disagree, answerTable],
    [StronglyDisagree, answerTable],
  ]).it(
    "given an answer '%s' ," + ' only that one should be selected',
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
