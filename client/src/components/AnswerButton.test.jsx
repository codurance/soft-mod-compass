import { render } from '@testing-library/react';
import React from 'react';
import AnswerButton from './AnswerButton';

const answerValue = 'Strongly Agree';
const isSelected = true;
const clickCallback = jest.fn();

describe('AnswerButton', () => {
  it('should display the right value', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer={isSelected}
        clickCallback={() => {}}
      />
    );

    expect(getByText(answerValue)).toBeInTheDocument();
  });

  it('contain selected class when answer is equals to selectedAnswer', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer={isSelected}
        clickCallback={() => {}}
      />
    );

    expect(getByText(answerValue)).toHaveClass('selected');
  });

  it('doesnt contain selected class when answer is different to selectedAnswer', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer={!isSelected}
        clickCallback={() => {}}
      />
    );

    expect(getByText(answerValue)).not.toHaveClass('selected');
  });

  it('execute the callback that contains the answer value when user clicks the button', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer=""
        clickCallback={clickCallback}
      />
    );

    getByText(answerValue).click();

    expect(clickCallback).toHaveBeenCalledTimes(1);
  });
});
