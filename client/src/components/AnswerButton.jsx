import React from 'react';
import PropTypes from 'prop-types';

function AnswerButton({ answer, selectedAnswer, clickCallback }) {


  return (
    <button
      type="button"
      className={selectedAnswer ? 'selected' : ''}
      onClick={clickCallback}
    >
      {answer}
    </button>
  );
}

export default AnswerButton;

AnswerButton.propTypes = {
  answer: PropTypes.string.isRequired,
  selectedAnswer: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired,
};
