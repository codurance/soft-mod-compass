import PropTypes from 'prop-types';
import React, { useState } from 'react';
import surveyConfig from '../../config/surveyModel.json';
import translator from '../../config/translator';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import './styles.scss';

function UserForm({ initialState, updateUserForm, submitForm }) {
  const [userForm, setUserForm] = useState(initialState);

  const handleChangeText = (fieldName) => (event) => {
    const newState = { ...userForm };
    newState[fieldName] = event.target.value;
    setUserForm(newState);

    updateUserForm(newState);
  };

  return (
    <div className="wrapper">
      <h2>Receive your report</h2>
      <p>
        Please provide us with a few details so that we can personalise your
        report.
      </p>
      <div className="form">
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
        <Button label="Submit" clickCallback={submitForm} />
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
