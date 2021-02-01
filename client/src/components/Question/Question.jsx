import PropTypes from 'prop-types';
import React from 'react';
import translator from '../../config/translator';
import AnswerOption from '../AnswerOption/AnswerOption';
import './styles.scss';

function Question({ question, onClickAnswer, isSelectedFunction }) {
  function renderAnswers() {
    return (
      <>
        <ul className="answer-list">
          {question.answers.map((answer) => (
            <AnswerOption
              key={answer.label}
              clickCallback={() => onClickAnswer(answer)}
              answer={translator[answer.label]}
              selectedAnswer={isSelectedFunction(answer)}
            />
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <p className="questionnaire__question">{translator[question.label]}</p>
      {renderAnswers()}
    </>
  );
}

export default Question;

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  isSelectedFunction: PropTypes.func.isRequired,
};
