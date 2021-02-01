import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import translator from '../../config/translator';
import questionList from '../../config/QuestionnaireModel';
import Question from './Question';

const {
  stronglyAgree,
  agree,
  neitherAgree,
  disagree,
  stronglyDisagree,
} = translator;

const firstQuestion = translator[questionList[0].label];
const secondQuestion = translator[questionList[1].label];

function mockStronglyAgreeSelected(answer) {
  return translator[answer.label] === stronglyAgree;
}

describe('Questionnaire', () => {
  it('should display only the first question', () => {
    const { getByText, queryByText } = render(
      <Question
        question={questionList[0]}
        isSelectedFunction={mockStronglyAgreeSelected}
        onClickAnswer={() => {}}
      />
    );
    expect(getByText(firstQuestion)).toBeInTheDocument();
    expect(queryByText(secondQuestion)).not.toBeInTheDocument();
    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(agree)).toBeInTheDocument();
    expect(getByText(neitherAgree)).toBeInTheDocument();
    expect(getByText(disagree)).toBeInTheDocument();
    expect(getByText(stronglyDisagree)).toBeInTheDocument();
  });

  it('should display the selected answer, stronglyAgree ', () => {
    const { getByText } = render(
      <Question
        question={questionList[0]}
        isSelectedFunction={mockStronglyAgreeSelected}
        onClickAnswer={() => {}}
      />
    );

    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(neitherAgree)).toBeInTheDocument();
    expect(getByText(stronglyAgree)).toHaveClass('answer--selected');
    expect(getByText(neitherAgree)).not.toHaveClass('answer--selected');
  });
});
