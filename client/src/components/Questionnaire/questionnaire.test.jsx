import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import Questionnaire from './Questionnaire';

const firstQuestion = translator[questionList[0].label];
const secondQuestion = translator[questionList[1].label];
describe('Questionnaire', () => {
  it('should display the current question', () => {
    const { getByText, queryByText } = render(
      <Questionnaire
        currentQuestion={questionList[0]}
        onClickAnswer={() => {}}
        isSelectedAnswer={() => {}}
      />
    );
    expect(getByText(firstQuestion)).toBeInTheDocument();
    expect(queryByText(secondQuestion)).not.toBeInTheDocument();
  });

  it('should have selected answer', () => {
    const selectedAnswer = questionList[0].answers[0];
    const { getByTestId } = render(
      <Questionnaire
        currentQuestion={questionList[0]}
        onClickAnswer={() => {}}
        isSelectedAnswer={(answer) => answer === selectedAnswer}
      />
    );
    expect(getByTestId(translator[selectedAnswer.label])).toHaveClass(
      'answer--selected'
    );
  });
});
