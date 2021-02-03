import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ProgressBar({ stages }) {
  function stepCompletionClass(isCompleted) {
    return isCompleted
      ? 'progress-bar__step--completed'
      : 'progress-bar__step--iniciated';
  }

  const renderStage = (stage) => {
    const isIniciated = !!stage.questions.find(
      (question) => question.isCompleted
    );

    return stage.questions.map((question) => (
      <div
        key={question.label}
        data-testid={question.label}
        className={
          isIniciated
            ? stepCompletionClass(question.isCompleted)
            : 'progress-bar__step'
        }
      />
    ));
  };

  return (
    <div className="progress-bar">
      {stages.map((stage) => (
        <div
          className="progress-bar__category"
          key={stage.category}
          data-testid={stage.category}
        >
          {renderStage(stage)}
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
