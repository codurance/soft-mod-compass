import { render } from '@testing-library/react';
import React from 'react';
import ProgressBar from './ProgressBar';

const next = 'next';
const previous = 'previous';
const nextStep = jest.fn();
const previousStep = jest.fn();

const className =
  'progress-bar__buttons__item progress-bar__buttons__item--disabled';
describe('ProgressBar should', () => {
  it('should contain next and previous icons', () => {
    const { getByTestId } = render(
      <ProgressBar
        currentStep={0}
        stepsNumber={0}
        nextStep={() => {}}
        previousStep={() => {}}
      />
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

  it('next element should contain selected when we are on the last step', () => {
    const { getByText, getByTestId } = render(
      <ProgressBar
        nextStep={() => {}}
        previousStep={previousStep}
        currentStep={5}
        stepsNumber={5}
      />
    );
    expect(getByText('5 of 5 completed')).toBeInTheDocument();
    expect(getByTestId(previous)).not.toHaveClass(className);
    expect(getByTestId(next)).toHaveClass(className);
  });

  it('previous element should contain selected when we are on the first step', () => {
    const { getByText, getByTestId } = render(
      <ProgressBar
        nextStep={() => {}}
        previousStep={previousStep}
        currentStep={0}
        stepsNumber={5}
      />
    );
    expect(getByText('0 of 5 completed')).toBeInTheDocument();
    expect(getByTestId(previous)).toHaveClass(className);
    expect(getByTestId(next)).not.toHaveClass(className);
  });
});
