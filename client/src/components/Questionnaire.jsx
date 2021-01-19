import React, { useState } from 'react';
import PropTypes from 'prop-types';
import surveyConfig from '../config/surveyModel.json';
import translator from '../config/translator';
import AnswerButton from './AnswerButton';

function Questionnaire({ initialState, handleQuestionnaire }) {
  const [questionnaire, setQuestionnaire] = useState(initialState);

  const updateState = (answer) => {
    setQuestionnaire(answer);
    handleQuestionnaire(answer);
  };

  function renderAnswers() {
    return surveyConfig.answers.map((answer) => (
      <AnswerButton
        key={answer.label}
        clickCallback={() => updateState(answer)}
        answer={translator[answer.label]}
        selectedAnswer={answer === questionnaire}
      />
    ));
  }

  return (
    <>
      <span>
        Decision making for IT product and projects is based on what will carry
        the most value for the business.This question is required.
      </span>
      {renderAnswers()}
    </>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  initialState: PropTypes.shape({
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  handleQuestionnaire: PropTypes.func.isRequired,
};
