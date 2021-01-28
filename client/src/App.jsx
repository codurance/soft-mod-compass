import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Questionnaire from './components/Questionnaire/Questionnaire';
import UserForm from './components/UserForm/UserForm';
import Welcome from './components/Welcome/Welcome';
import redirectService from './services/redirectService';
import reportService from './services/reportService';
import './styles.scss';
import './styles/global.scss';

const initialTextFieldsState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};

function App({ initialStep }) {
  const [textFields, setTextFields] = useState(initialTextFieldsState);
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentStep, setCurrentStep] = useState(initialStep);

  const updateUserForm = (data) => {
    setTextFields(data);
  };

  const handleSubmit = () => {
    const data = { ...textFields };
    data.questionnaire = questionnaire;
    reportService
      .submitSurvey(data)
      .then(() => redirectService.redirect())
      .catch((reason) => console.log('error from server ', reason));
  };

  const updateQuestionnaire = (answer) => {
    setQuestionnaire(answer);
    setCurrentStep(currentStep + 1);
  };

  const setNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="app">
      {currentStep === 0 && <Welcome clickCallback={setNextStep} />}
      {currentStep === 1 && (
        <Questionnaire finishQuestionnaire={updateQuestionnaire} />
      )}
      {currentStep === 2 && (
        <div>
          <UserForm
            initialState={textFields}
            updateUserForm={updateUserForm}
            submitForm={handleSubmit}
          />
        </div>
      )}
      <ProgressBar
        stepsNumber={2}
        currentStep={currentStep}
        nextStep={handleNextStep}
        previousStep={handlePreviousStep}
      />
    </div>
  );
}

App.propTypes = {
  initialStep: PropTypes.number,
};

App.defaultProps = {
  initialStep: 0,
};

export default App;
