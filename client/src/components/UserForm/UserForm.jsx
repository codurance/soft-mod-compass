import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import submissionImage from '../../assets/icons/report-submission-page.svg';
import translator from '../../config/translator';
import userFormValues from '../../config/userFormValues';
import privacyPolicyUrl from '../../services/privacyPolicyUrl';
import './styles.scss';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const {
  userFormTitle,
  userFormDescription,
  firstName,
  firstNameError,
  lastName,
  lastNameError,
  companyName,
  companyNameError,
  jobFunctionError,
  email,
  emailError,
  submit,
  jobFunction,
  checkboxError,
} = translator;

function UserForm({ submitForm }) {
  const { register, errors, handleSubmit } = useForm();
  function onSubmit(data) {
    submitForm(data);
  }

  return (
    <div className="form">
      <SwitchTransition className="animation-wrapper">
        <CSSTransition timeout={500} appear key="" classNames="fade">
          <div className="form__fields-wrapper">
            <h2>{userFormTitle}</h2>
            <p>{userFormDescription}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className={`input${errors.firstName ? '__error' : ''}`}
                placeholder={firstName}
                name="firstName"
                ref={register({ required: true })}
              />
              <div className="form__error">
                {errors.firstName && firstNameError}
              </div>
              <input
                className={`input${errors.lastName ? '__error' : ''}`}
                placeholder={lastName}
                name="lastName"
                ref={register({ required: true })}
              />
              <div className="form__error">
                {errors.lastName && lastNameError}
              </div>
              <input
                className={`input${errors.companyName ? '__error' : ''}`}
                placeholder={companyName}
                name="companyName"
                ref={register({ required: true })}
              />
              <div className="form__error">
                {errors.companyName && companyNameError}
              </div>
              <select
                name="jobFunction"
                data-testid="select"
                ref={register({ required: true })}
                defaultValue={null}
                className={`input${errors.jobFunction ? '__error' : ''}`}
              >
                <option data-testid="option" value={null} label={jobFunction} />
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
                {errors.jobFunction && jobFunctionError}
              </div>
              <input
                className={`input${errors.email ? '__error' : ''}`}
                placeholder={email}
                name="email"
                ref={register({ required: true, pattern: emailRegex })}
              />
              <div className="form__error">{errors.email && emailError}</div>
              <div className="form__gdpr">
                <input
                  type="checkbox"
                  name="checkbox"
                  data-testid="gdprCheckbox"
                  ref={register({ required: true })}
                />
                <span className="form__gdpr__text">
                  {translator.gdprText}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={privacyPolicyUrl()}
                    className=" form__gdpr__text privacyPolicy"
                  >
                    {translator.privacyPolicy}
                  </a>
                </span>
              </div>

              <div className="form__error">
                {errors.checkbox && checkboxError}
              </div>

              <div className="form__submit">
                <input
                  className="button color-persimmon"
                  type="submit"
                  value={submit}
                />
              </div>
            </form>
          </div>
        </CSSTransition>
      </SwitchTransition>
      <img className="form__assessment" src={submissionImage} alt="Section" />
    </div>
  );
}

export default UserForm;

UserForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
