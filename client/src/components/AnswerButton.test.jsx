import { render } from '@testing-library/react';
import React from 'react';
import AnswerButton from './AnswerButton';

const answerValue = 'Strongly Agree';
const clickCallback = jest.fn();
// The first arg of the first call to the function was 'first arg'
const firstPassedArgumentOf = (mockedFunction) =>
  mockedFunction.mock.calls[0][0];

describe('AnswerButton', () => {
  it('should display the right value', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer=""
        clickCallback={() => {}}
      />
    );

    expect(getByText(answerValue)).toBeInTheDocument();
  });

  it('contain selected class when answer is equals to selectedAnswer', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer={answerValue}
        clickCallback={() => {}}
      />
    );

    expect(getByText(answerValue)).toHaveClass('selected');
  });

  it('contain selected class when answer is different to selectedAnswer', () => {
    const { getByText } = render(
      <AnswerButton
        answer={answerValue}
        selectedAnswer=""
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

    const event = firstPassedArgumentOf(clickCallback);
    expect(clickCallback).toHaveBeenCalledTimes(1);
    expect(event.target.value).toBe(answerValue);
  });
});
