import PropTypes from 'prop-types';
import React from 'react';

function Button({ label, clickCallback }) {
  return <button onClick={clickCallback}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
};
export default Button;
