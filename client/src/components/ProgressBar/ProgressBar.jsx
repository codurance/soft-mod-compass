import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ProgressBar({ currentStage, stages }) {
  function getStageClassName(isCategoryInitiated, question) {
    if (currentStage === question.label) return 'progress-bar__step--current';
    if (question.isCompleted) return 'progress-bar__step--completed';
    if (isCategoryInitiated) return 'progress-bar__step--iniciated';
    return 'progress-bar__step';
  }

  function isCompletedOrCurrent(question) {
    return question.label === currentStage || question.isCompleted;
  }

  const renderStage = (stage) => {
    const isCategoryInitiated = !!stage.questions.find((question) =>
      isCompletedOrCurrent(question)
    );

    return stage.questions.map((question) => (
      <div
        key={question.label}
        data-testid={question.label}
        className={getStageClassName(isCategoryInitiated, question)}
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
  currentStage: PropTypes.string.isRequired,
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
