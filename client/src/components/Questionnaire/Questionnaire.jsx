import PropTypes from 'prop-types';
import React, { useState } from 'react';
import surveyConfig from '../../config/surveyModel.json';
import translator from '../../config/translator';
import AnswerOption from '../AnswerOption/AnswerOption';
import './styles.scss';

function Questionnaire({ initialState, handleQuestionnaire }) {
  const [questionnaire, setQuestionnaire] = useState(initialState);

  const updateState = (answer) => {
    setQuestionnaire(answer);
    handleQuestionnaire(answer);
  };

  function renderAnswers() {
    return (
      <ul className="questionnaire__answer-list">
        {surveyConfig.answers.map((answer) => (
          <AnswerOption
            key={answer.label}
            clickCallback={() => updateState(answer)}
            answer={translator[answer.label]}
            selectedAnswer={answer === questionnaire}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="questionnaire wrapper">
      <p className="questionnaire__question">{translator.question}</p>
      {renderAnswers()}
    </div>
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
