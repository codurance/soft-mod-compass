import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function AnswerOption({ answer, selectedAnswer, clickCallback }) {
  return (
    <li
      // TODO check the warning when we remove aria-hidden
      aria-hidden="true"
      className={`answer ${selectedAnswer ? 'answer--selected' : ''}`}
      onClick={clickCallback}
    >
      <span>{answer}</span>
      <div className="answer__icon" />
    </li>
  );
}

export default AnswerOption;

AnswerOption.propTypes = {
  answer: PropTypes.string.isRequired,
  selectedAnswer: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired,
};
