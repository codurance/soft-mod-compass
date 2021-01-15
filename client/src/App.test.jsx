import { render } from '@testing-library/react';
import React from 'react';
import each from 'jest-each';
import App from './App';

const stronglyAgree = 'Strongly Agree';
const Agree = 'Agree';
const NeitherAgree = 'Neither Agree Nor Disagree';
const Disagree = 'Disagree';
const StronglyDisagree = 'Strongly Disagree';

describe('app', () => {
  it('should display the first question', () => {
    const { getByText } = render(<App />);
    expect(
      getByText(
        'Decision making for IT product and projects is based on what will carry the most value for the business.This question is required.'
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
  ]).it("when the answer is '%s'", (selectedAnswer, answers) => {
    const { getByText } = render(<App />);
    getByText(selectedAnswer).click();
    answers.forEach((answer) => {
      if (selectedAnswer === answer) {
        expect(getByText(answer)).toHaveClass('selected');
      } else {
        expect(getByText(answer)).not.toHaveClass('selected');
      }
    });
  });
});
