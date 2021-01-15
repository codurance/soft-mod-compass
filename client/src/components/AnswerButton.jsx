import React from 'react';
import PropTypes from 'prop-types';

function AnswerButton({ answer, selectedAnswer, clickCallback }) {
  const getSelectedClass = (answerValue) => {
    if (answerValue === selectedAnswer) return 'selected';
    return '';
  };

  return (
    <button
      type="button"
      className={getSelectedClass(answer)}
      onClick={clickCallback}
      value={answer}
    >
      {answer}
    </button>
  );
}

export default AnswerButton;

AnswerButton.propTypes = {
  answer: PropTypes.string.isRequired,
  selectedAnswer: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
};
