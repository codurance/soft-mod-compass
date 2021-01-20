import { render } from '@testing-library/react';
import React from 'react';
import ProgressBar from './ProgressBar';

const next = 'next';
const previous = 'previous';
const nextStep = jest.fn();
const previousStep = jest.fn();

describe('ProgressBar should', () => {
  it('should contain next and previous icons', () => {
    const { getByTestId } = render(<ProgressBar />);

    expect(getByTestId(next)).toBeInTheDocument();
    expect(getByTestId(previous)).toBeInTheDocument();
  });

  it('should execute nextStep function when the user clicks in next', () => {
    const { getByTestId } = render(
      <ProgressBar nextStep={nextStep} previousStep={() => {}} />
    );

    getByTestId(next).click();

    expect(nextStep).toHaveBeenCalledTimes(1);
  });

  it('should execute previousStep function when the user clicks in previous', () => {
    const { getByTestId } = render(
      <ProgressBar nextStep={() => {}} previousStep={previousStep} />
    );

    getByTestId(previous).click();

    expect(previousStep).toHaveBeenCalledTimes(1);
  });
});
