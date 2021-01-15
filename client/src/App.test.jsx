import { render } from '@testing-library/react';
import React from 'react';
import each from 'jest-each';
import { fireEvent } from '@testing-library/dom';
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

  const answerTable = [
    stronglyAgree,
    Agree,
    NeitherAgree,
    Disagree,
    StronglyDisagree,
  ];
  each([
    [stronglyAgree, answerTable],
    [Agree, answerTable],
    [NeitherAgree, answerTable],
    [Disagree, answerTable],
    [StronglyDisagree, answerTable],
  ]).it("when the answer is '%s'", (selectedAnswer, answers) => {
    const { getByText } = render(<App />);
    getByText(selectedAnswer).click();
    answers.forEach((answer) => {
      if (selectedAnswer === answer) {
        expect(getByText(answer)).toHaveClass('selected');
      } else {
        expect(getByText(answer)).not.toHaveClass('selected');
      }
    });
  });

  each([
    ['First Name', 'Alice'],
    ['Last Name', 'Cooper'],
    ['Company Name', 'Codurance'],
    ['Email', 'alice.cooper@codurance.com'],
  ]).it(
    'should change the text value of the firstname input field when the firstname field is changed',
    (labelName, expectedTextValue) => {
      const { getByLabelText } = render(<App />);
      const inputFirstName = getByLabelText(labelName);
      expect(inputFirstName.value).not.toBe(expectedTextValue);
      fireEvent.change(inputFirstName, {
        target: { value: expectedTextValue },
      });
      expect(inputFirstName.value).toBe(expectedTextValue);
    }
  );

  it('should display the submit button', () => {
    const { getByText } = render(<App />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should call submitServey with the data', () => {
    const { getByText } = render(<App />);
    const spy = jest
      .spyOn(reportService, 'submitSurvey')
      .mockImplementation((payload) => {});

    getByText('Submit').click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
