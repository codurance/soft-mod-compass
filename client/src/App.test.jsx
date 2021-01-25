import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import translator from './config/translator';
import redirectService from './services/redirectService';
import reportService from './services/reportService';

const {
  firstName,
  start,
  welcomeFirstParagraph,
  welcomeSecondParagraph,
  question,
  stronglyAgree,
  agree,
  neitherAgree,
  disagree,
  stronglyDisagree,
  submit,
} = translator;

describe('app', () => {
  it('should display the Welcome component', () => {
    const { getByText } = render(<App />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });
  it('should display the first question', () => {
    const { getByText } = render(<App initialStep={1} />);
    expect(getByText(question)).toBeInTheDocument();
    expect(getByText(stronglyAgree)).toBeInTheDocument();
    expect(getByText(agree)).toBeInTheDocument();
    expect(getByText(neitherAgree)).toBeInTheDocument();
    expect(getByText(disagree)).toBeInTheDocument();
    expect(getByText(stronglyDisagree)).toBeInTheDocument();
  });

  it('should display the submit button', () => {
    const { getByText } = render(<App initialStep={2} />);
    expect(getByText(submit)).toBeInTheDocument();
  });

  it('should call submitSurvey service', () => {
    const { getByText } = render(<App initialStep={2} />);
    const spy = jest
      .spyOn(reportService, 'submitSurvey')
      .mockImplementation(() => {});
    getByText(submit).click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call redirect afeter click on submit', () => {
    const { getByText } = render(<App initialStep={2} />);
    const spy = jest.spyOn(redirectService, 'redirect');

    getByText(submit).click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should only display the Welcome component', () => {
    const { getByText, queryByText } = render(<App />);

    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(queryByText(question)).not.toBeInTheDocument();
    expect(queryByText(firstName)).not.toBeInTheDocument();
  });

  it('should change the content of the screen when the user clicks to move forward', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(<App />);

    getByText(start).click();

    expect(queryByText(welcomeFirstParagraph)).not.toBeInTheDocument();
    expect(getByText(question)).toBeInTheDocument();
    expect(queryByText(firstName)).not.toBeInTheDocument();

    getByText(neitherAgree).click();

    expect(queryByText(welcomeFirstParagraph)).not.toBeInTheDocument();
    expect(queryByText(question)).not.toBeInTheDocument();

    expect(getByPlaceholderText(firstName)).toBeInTheDocument();
  });
});
