import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function InputText({ textValue, onChangeCallBack }) {
  return (
    <>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
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
};
