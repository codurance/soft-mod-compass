import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function InputText({ textValue, onChangeCallBack, label }) {
  return (
    <input
      className="input"
      placeholder={label}
      type="text"
      id={label}
      name={label}
      value={textValue}
      onChange={onChangeCallBack}
      required
    />
  );
}

export default InputText;

InputText.propTypes = {
  textValue: PropTypes.string.isRequired,
  onChangeCallBack: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
