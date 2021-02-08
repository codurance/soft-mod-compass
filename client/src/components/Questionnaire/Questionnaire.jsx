import PropTypes from 'prop-types';
import React from 'react';
import Question from '../Question/Question';
import './styles.scss';

function Questionnaire({ currentQuestion, onClickAnswer, isSelectedAnswer }) {
  return (
    <div className="questionnaire">
      <Question
        question={currentQuestion}
        onClickAnswer={onClickAnswer}
        isSelectedFunction={isSelectedAnswer}
      />
      <div
        className={`questionnaire__assessment--${currentQuestion.category}`}
        data-testid={`background-${currentQuestion.category}`}
      />
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  currentQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  isSelectedAnswer: PropTypes.func.isRequired,
};
