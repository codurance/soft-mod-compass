import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('app', () => {
  it('should display the first question', () => {
    const { getByText } = render(<App />);
    expect(
      getByText('Decision making for IT product and projects is based on what will carry the most value for the business.This question is required.'),
    ).toBeInTheDocument();
    expect(
      getByText('Strongly Agree'),
    ).toBeInTheDocument();
    expect(
      getByText('Agree'),
    ).toBeInTheDocument();
    expect(
      getByText('Neither Agree Nor Disagree'),
    ).toBeInTheDocument();
    expect(
      getByText('Disagree'),
    ).toBeInTheDocument();
    expect(
      getByText('Strongly Disagree'),
    ).toBeInTheDocument();
  });
  it('should display checked element when click answer', () => {
    const { getByText } = render(<App />);
    getByText('Strongly Agree').click();
    expect(getByText('Strongly Agree')).toHaveClass('selected');
    getByText('Agree').click();
    expect(getByText('Strongly Agree')).not.toHaveClass('selected');
    expect(getByText('Agree')).toHaveClass('selected');
  });
});
