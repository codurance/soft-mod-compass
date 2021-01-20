import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ProgressBar({ nextStep }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__buttons">
        <div data-testid="previous" className="progress-bar__buttons__item">
          {'<'}
        </div>

        <div
          aria-hidden
          onClick={nextStep}
          data-testid="next"
          className="progress-bar__buttons__item"
        >
          {'>'}
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default ProgressBar;
