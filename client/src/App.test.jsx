import { render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import App from './App';
import reportService from './services/reportService';

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

  it('should display the submit button', () => {
    const { getByText } = render(<App />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should call submitSurvey service', () => {
    const { getByText } = render(<App />);
    const spy = jest
      .spyOn(reportService, 'submitSurvey')
      .mockImplementation((payload) => {});
    getByText('Submit').click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO CREATE A TEST FOR MOCKED COMPONENTS
});
