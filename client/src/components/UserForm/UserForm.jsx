import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import translator from '../../config/translator';
import './styles.scss';
import submissionImage from '../../assets/icons/report-submission-page.svg';
import userFormValues from '../../config/userFormValues';

function UserForm({ submitForm }) {
  const { register, errors, handleSubmit } = useForm();
  function onSubmit(data) {
    submitForm(data);
  }

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return (
    <div className="form">
      <div className="form__fields-wrapper">
        <h2>{translator.userFormTitle}</h2>
        <p>{translator.userFormDescription}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`input${errors.firstName ? '__error' : ''}`}
            placeholder={translator.firstName}
            name="firstName"
            ref={register({ required: true })}
          />
          <div className="form__error">
            {errors.firstName && 'First name is required'}
          </div>
          <input
            className={`input${errors.lastName ? '__error' : ''}`}
            placeholder={translator.lastName}
            name="lastName"
            ref={register({ required: true })}
          />
          <div className="form__error">
            {errors.lastName && 'Last name is required'}
          </div>
          <input
            className={`input${errors.companyName ? '__error' : ''}`}
            placeholder={translator.companyName}
            name="companyName"
            ref={register({ required: true })}
          />
          <div className="form__error">
            {errors.companyName && 'Company name is required'}
          </div>
          <select
            name="jobFunction"
            data-testid="select"
            ref={register({ required: true })}
            defaultValue={null}
            className={`input${errors.jobFunction ? '__error' : ''}`}
          >
            <option data-testid="option" value={null} label="Job Function" />
            {userFormValues.map((element) => (
              <option
                data-testid="option"
                value={element}
                key={element}
                label={element}
              />
            ))}
          </select>
          <div className="form__error">
            {errors.jobFunction && 'Job function is required'}
          </div>
          <input
            className={`input${errors.email ? '__error' : ''}`}
            placeholder={translator.email}
            name="email"
            ref={register({ required: true, pattern: emailRegex })}
          />
          <div className="form__error">
            {errors.email && 'valid email is required'}
          </div>
          <div className="form__submit">
            <input
              className="button color-persimmon"
              type="submit"
              value={translator.submit}
            />
          </div>
        </form>
      </div>
      <img className="form__assessment" src={submissionImage} alt="Section" />
    </div>
  );
}

export default UserForm;

UserForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
