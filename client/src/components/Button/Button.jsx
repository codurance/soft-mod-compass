import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function Button({ label, clickCallback }) {
  return (
    <button
      className="button color-persimmon"
      type="button"
      onClick={clickCallback}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
};
export default Button;
