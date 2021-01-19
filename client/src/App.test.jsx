import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import {
  welcomeFirstParagraph,
  welcomeSecondParagraph,
} from './config/en-labels.json';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';
import reportService from './services/reportService';

const stronglyAgree = 'Strongly Agree';
const Agree = 'Agree';
const NeitherAgree = 'Neither Agree Nor Disagree';
const Disagree = 'Disagree';
const StronglyDisagree = 'Strongly Disagree';
const question =
  'Decision making for IT product and projects is based on what will carry the most value for the business.This question is required.';

describe('app', () => {
  it('should display the Welcome component', () => {
    const { getByText } = render(<App />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });
  it('should display the first question', () => {
    const { getByText } = render(<App initialStep={1} />);
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
    const { getByText } = render(<App initialStep={2} />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should call submitSurvey service', () => {
    const { getByText } = render(<App initialStep={2} />);
    const spy = jest
      .spyOn(reportService, 'submitSurvey')
      .mockImplementation((payload) => {});
    getByText('Submit').click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should only display the Welcome component', () => {
    const { getByText, queryByText } = render(<App />);

    expect(getByText(translator.welcomeFirstParagraph)).toBeInTheDocument();
    expect(queryByText(question)).not.toBeInTheDocument();
    expect(
      queryByText(translator[surveyConfig.firstNameLabel])
    ).not.toBeInTheDocument();
  });

  it('should change the content of the screen when the user clicks to move forward', () => {
    const { getByText, queryByText } = render(<App />);

    getByText('Start').click();

    expect(
      queryByText(translator.welcomeFirstParagraph)
    ).not.toBeInTheDocument();
    expect(getByText(question)).toBeInTheDocument();
    expect(
      queryByText(translator[surveyConfig.firstNameLabel])
    ).not.toBeInTheDocument();

    getByText(NeitherAgree).click();

    expect(
      queryByText(translator.welcomeFirstParagraph)
    ).not.toBeInTheDocument();
    expect(queryByText(question)).not.toBeInTheDocument();
    expect(
      getByText(translator[surveyConfig.firstNameLabel])
    ).toBeInTheDocument();
  });
});
