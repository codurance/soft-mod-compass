import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputText from './InputText';
import translator from '../config/translator';
import surveyConfig from '../config/surveyModel.json';

function UserForm({ initialState, updateUserForm }) {
  const [userForm, setUserForm] = useState(initialState);

  const handleChangeText = (fieldName) => (event) => {
    const newState = { ...userForm };
    newState[fieldName] = event.target.value;
    setUserForm(newState);

    updateUserForm(newState);
  };

  return (
    <>
      <InputText
        textValue={userForm.firstName}
        onChangeCallBack={handleChangeText('firstName')}
        label={translator[surveyConfig.firstNameLabel]}
      />
      <InputText
        textValue={userForm.lastName}
        onChangeCallBack={handleChangeText('lastName')}
        label={translator[surveyConfig.lastNameLabel]}
      />
      <InputText
        textValue={userForm.companyName}
        onChangeCallBack={handleChangeText('companyName')}
        label={translator[surveyConfig.companyLabel]}
      />
      <InputText
        textValue={userForm.email}
        onChangeCallBack={handleChangeText('email')}
        label={translator[surveyConfig.emailLabel]}
      />
    </>
  );
}

export default UserForm;

UserForm.propTypes = {
  initialState: PropTypes.object.isRequired,
  updateUserForm: PropTypes.func.isRequired,
};
