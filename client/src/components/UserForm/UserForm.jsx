import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import translator from '../../config/translator';
import './styles.scss';

function UserForm({ initialState, updateUserForm, submitForm }) {
  // const [userForm, setUserForm] = useState(initialState);
  // const handleChangeText = (fieldName) => (event) => {
  //   const newState = { ...userForm };
  //   newState[fieldName] = event.target.value;
  //   setUserForm(newState);
  //
  //   updateUserForm(newState);
  // };
  const { register, errors, handleSubmit } = useForm();
  function onSubmit(data) {
    console.log('user form data ', data);
    // updateUserForm(data);
    submitForm(data);
  }

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return (
    <div className="wrapper">
      <h2>{translator.userFormTitle}</h2>
      <p>{translator.userFormDescription}</p>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            placeholder={translator.firstName}
            name="firstName"
            ref={register({ required: true })}
          />
          {errors.firstName && 'First name is required'}
          <input
            className="input"
            placeholder={translator.lastName}
            name="lastName"
            ref={register({ required: true })}
          />
          {errors.lastName && 'Last name is required'}
          <input
            className="input"
            placeholder={translator.companyName}
            name="companyName"
            ref={register({ required: true })}
          />
          {errors.companyName && 'Company name is required'}
          <input
            className="input"
            placeholder={translator.email}
            name="email"
            ref={register({ required: true, pattern: emailRegex })}
          />
          {errors.email && 'email is required'}
          <input
            className="button color-valencia"
            type="submit"
            value={translator.submit}
          />
        </form>
        {/* <InputText */}
        {/*  textValue={userForm.firstName} */}
        {/*  onChangeCallBack={handleChangeText('firstName')} */}
        {/*  label={translator[surveyConfig.firstNameLabel]} */}
        {/* /> */}
        {/* <InputText */}
        {/*  textValue={userForm.lastName} */}
        {/*  onChangeCallBack={handleChangeText('lastName')} */}
        {/*  label={translator[surveyConfig.lastNameLabel]} */}
        {/* /> */}
        {/* <InputText */}
        {/*  textValue={userForm.companyName} */}
        {/*  onChangeCallBack={handleChangeText('companyName')} */}
        {/*  label={translator[surveyConfig.companyLabel]} */}
        {/* /> */}
        {/* <InputText */}
        {/*  textValue={userForm.email} */}
        {/*  onChangeCallBack={handleChangeText('email')} */}
        {/*  label={translator[surveyConfig.emailLabel]} */}
        {/* /> */}
        {/* <Button label={translator.submit} clickCallback={submitForm} /> */}
      </div>
    </div>
  );
}

export default UserForm;

UserForm.propTypes = {
  initialState: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  updateUserForm: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};
