import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function InputText({ textValue, onChangeCallBack, label }) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        id={label}
        name={label}
        value={textValue}
        onChange={onChangeCallBack}
        required
      />
    </>
  );
}

export default InputText;

InputText.propTypes = {
  textValue: PropTypes.string.isRequired,
  onChangeCallBack: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
