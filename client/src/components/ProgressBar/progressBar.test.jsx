import { getByText, render } from '@testing-library/react';
import React from 'react';
import ProgressBar from './ProgressBar';

const next = 'next';
const previous = 'previous';
const nextStep = jest.fn();
const previousStep = jest.fn();

describe('ProgressBar should', () => {
  it('should contain next and previous icons', () => {
    const { getByTestId } = render(
      <ProgressBar currentStep={0} stepsNumber={0} />
    );

    expect(getByTestId(next)).toBeInTheDocument();
    expect(getByTestId(previous)).toBeInTheDocument();
  });

  it('should execute nextStep function when the user clicks in next', () => {
    const { getByTestId } = render(
      <ProgressBar
        currentStep={0}
        stepsNumber={0}
        nextStep={nextStep}
        previousStep={() => {}}
      />
    );

    getByTestId(next).click();

    expect(nextStep).toHaveBeenCalledTimes(1);
  });

  it('should execute previousStep function when the user clicks in previous', () => {
    const { getByTestId } = render(
      <ProgressBar
        currentStep={0}
        stepsNumber={0}
        nextStep={() => {}}
        previousStep={previousStep}
      />
    );

    getByTestId(previous).click();

    expect(previousStep).toHaveBeenCalledTimes(1);
  });

  it('should display current step and the amount of steps', () => {
    const { getByText } = render(
      <ProgressBar
        nextStep={() => {}}
        previousStep={previousStep}
        currentStep={3}
        stepsNumber={5}
      />
    );

    expect(getByText('3 of 5 completed')).toBeInTheDocument();
  });
});
