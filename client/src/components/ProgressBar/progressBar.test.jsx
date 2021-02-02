import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('should contain only 1 category and 1 question uncompleted', () => {
    const progressBarStages = [
      {
        category: 'organisationalMaturity',
        questions: [{ label: 'devSecOps', isCompleted: false }],
      },
    ];
    const { getByTestId } = render(<ProgressBar stages={progressBarStages} />);

    expect(getByTestId('organisationalMaturity')).toBeInTheDocument();
    expect(getByTestId('devSecOps')).toBeInTheDocument();
    expect(getByTestId('devSecOps')).not.toHaveClass(
      'progress-bar__step--completed'
    );
  });
  it('should contain only 1 category and 1 question completed', () => {
    const progressBarStages = [
      {
        category: 'organisationalMaturity',
        questions: [{ label: 'devSecOps', isCompleted: true }],
      },
    ];
    const { getByTestId } = render(<ProgressBar stages={progressBarStages} />);

    expect(getByTestId('organisationalMaturity')).toBeInTheDocument();
    expect(getByTestId('devSecOps')).toBeInTheDocument();
    expect(getByTestId('devSecOps')).toHaveClass(
      'progress-bar__step--completed'
    );
  });

  it('should contain only 1 category and 2 question completed', () => {
    const progressBarStages = [
      {
        category: 'organisationalMaturity',
        questions: [
          { label: 'qu1', isCompleted: true },
          { label: 'qu2', isCompleted: true },
        ],
      },
    ];
    const { getByTestId } = render(<ProgressBar stages={progressBarStages} />);

    expect(getByTestId('organisationalMaturity')).toBeInTheDocument();
    expect(getByTestId('qu1')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu2')).toHaveClass('progress-bar__step--completed');
  });

  it('should contain only 2 categories and 2 questions completed', () => {
    const progressBarStages = [
      {
        category: 'cat1',
        questions: [
          { label: 'qu1', isCompleted: true },
          { label: 'qu2', isCompleted: true },
        ],
      },
      {
        category: 'cat2',
        questions: [
          { label: 'qu3', isCompleted: true },
          { label: 'qu4', isCompleted: true },
        ],
      },
    ];
    const { getByTestId } = render(<ProgressBar stages={progressBarStages} />);

    expect(getByTestId('cat1')).toBeInTheDocument();
    expect(getByTestId('cat2')).toBeInTheDocument();
    expect(getByTestId('qu1')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu2')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu3')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu4')).toHaveClass('progress-bar__step--completed');
  });

  it('should contain only 2 categories and 2 questions by category with only last question uncompleted', () => {
    const progressBarStages = [
      {
        category: 'cat1',
        questions: [
          { label: 'qu1', isCompleted: true },
          { label: 'qu2', isCompleted: true },
        ],
      },
      {
        category: 'cat2',
        questions: [
          { label: 'qu3', isCompleted: true },
          { label: 'qu4', isCompleted: false },
        ],
      },
    ];
    const { getByTestId } = render(<ProgressBar stages={progressBarStages} />);

    expect(getByTestId('cat1')).toBeInTheDocument();
    expect(getByTestId('cat2')).toBeInTheDocument();
    expect(getByTestId('qu1')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu2')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu3')).toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu4')).not.toHaveClass('progress-bar__step--completed');
    expect(getByTestId('qu4')).toHaveClass('progress-bar__step');
  });
});
