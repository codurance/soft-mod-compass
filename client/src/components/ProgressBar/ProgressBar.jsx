import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ProgressBar({ nextStep, previousStep, currentStep, stepsNumber }) {
  const isDisabled = (isNextStep) => {
    if (isNextStep && currentStep === stepsNumber)
      return 'progress-bar__buttons__item--disabled';
    if (!isNextStep && currentStep === 0)
      return 'progress-bar__buttons__item--disabled';
    return '';
  };

  return (
    <div className="progress-bar">
      <span className="progress-bar__text">{`${currentStep} of ${stepsNumber} completed`}</span>
      <div className="progress-bar__buttons">
        <div
          aria-hidden
          onClick={previousStep}
          data-testid="previous"
          className={`progress-bar__buttons__item ${isDisabled(false)}`}
        >
          {'<'}
        </div>

        <div
          aria-hidden
          onClick={nextStep}
          data-testid="next"
          className={`progress-bar__buttons__item ${isDisabled(true)}`}
        >
          {'>'}
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  stepsNumber: PropTypes.number.isRequired,
};

export default ProgressBar;
