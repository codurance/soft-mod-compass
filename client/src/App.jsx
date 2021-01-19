import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import UserForm from './components/UserForm';
import Welcome from './components/Welcome';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';
import reportService from './services/reportService';
import './styles.scss';
import './styles/global.scss';

const initialTextFieldsState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};
const initialAnswerState = {
  label: '',
  score: 0,
};

function App({ initialStep = 0 }) {
  const [textFields, setTextFields] = useState(initialTextFieldsState);
  const [questionnaire, setQuestionnaire] = useState(initialAnswerState);
  const [currentStep, setCurrentStep] = useState(initialStep);

  const updateUserForm = (data) => {
    setTextFields(data);
  };

  const handleSubmit = () => {
    const data = { ...textFields };
    data.answer = questionnaire;
    reportService.submitSurvey(data);
  };

  const updateQuestionnaire = (answer) => {
    setQuestionnaire(answer);
    setCurrentStep(currentStep + 1);
  };

  const setNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="app">
      {currentStep === 0 && <Welcome clickCallback={setNextStep} />}
      {currentStep === 1 && (
        <Questionnaire
          initialState={questionnaire}
          handleQuestionnaire={updateQuestionnaire}
        />
      )}
      {currentStep === 2 && (
        <>
          <UserForm initialState={textFields} updateUserForm={updateUserForm} />
          <button type="submit" onClick={handleSubmit}>
            {translator[surveyConfig.submitLabel]}
          </button>
        </>
      )}
    </div>
  );
}

App.propTypes = {
  initialStep: PropTypes.number,
};

export default App;
