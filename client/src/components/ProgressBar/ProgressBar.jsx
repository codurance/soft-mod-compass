import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ProgressBar({ stages }) {
  function stepCompletionClass(isCompleted) {
    return isCompleted ? 'progress-bar__step--completed' : 'progress-bar__step';
  }

  return (
    <div className="progress-bar">
      {stages.map((stage) => (
        <div key={stage.category} data-testid={stage.category}>
          {stage.questions.map((question) => (
            <div
              key={question.label}
              data-testid={question.label}
              className={stepCompletionClass(question.isCompleted)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

ProgressBar.propTypes = {
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          isCompleted: PropTypes.bool.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default ProgressBar;
