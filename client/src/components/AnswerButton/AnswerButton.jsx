import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function AnswerButton({ answer, selectedAnswer, clickCallback }) {
  return (
    <div className="answer">
      <button
        type="button"
        className={`answer__button ${selectedAnswer ? 'selected' : ''}`}
        onClick={clickCallback}
      >
        {answer}
      </button>
    </div>
  );
}

export default AnswerButton;

AnswerButton.propTypes = {
  answer: PropTypes.string.isRequired,
  selectedAnswer: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired,
};
