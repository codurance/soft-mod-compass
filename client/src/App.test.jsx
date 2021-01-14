import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('app', () => {
  it('should display the first question', () => {
    const app = render(<App />);
    expect(
      app.getByText('Decision making for IT product and projects is based on what will carry the most value for the business.This question is required.'),
    ).toBeInTheDocument();
    expect(
      app.getByText('Strongly Agree'),
    ).toBeInTheDocument();
    expect(
      app.getByText('Agree'),
    ).toBeInTheDocument();
    expect(
      app.getByText('Neither Agree Nor Disagree'),
    ).toBeInTheDocument();
    expect(
      app.getByText('Disagree'),
    ).toBeInTheDocument();
    expect(
      app.getByText('Strongly Disagree'),
    ).toBeInTheDocument();
  });
});
