import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Questionnaire from '../../components/Questionnaire/Questionnaire';
import UserForm from '../../components/UserForm/UserForm';
import questionnaireMapper from '../../mappers/questionnaireMapper';
import redirectService from '../../services/redirectService';
import reportService from '../../services/reportService';
import './styles.scss';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import progressBarMapper from '../../mappers/progressBarMapper';
import questionList from '../../config/QuestionnaireModel';
import Header from '../../components/Header/Header';

const initialUserDetails = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};

function App({ initialStep }) {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleSubmit = (userForm) => {
    console.log('user details ', userForm);
    const data = { ...userForm };
    data.categories = questionnaireMapper.generateQuestionnaire(questionnaire);
    reportService
      .submitSurvey(data)
      .then(() => redirectService.redirect())
      .catch((reason) => console.log('error from server ', reason));
  };

  const updateQuestionnaire = (answer) => {
    setQuestionnaire(answer);
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="app">
      <Header />
      <main>
        {currentStep === 0 && (
          <Questionnaire
            onFinishQuestionnaire={updateQuestionnaire}
            onUpdateQuestionnaire={setQuestionnaire}
          />
        )}
        {currentStep === 1 && (
          <div>
            <UserForm
              initialState={userDetails}
              updateUserForm={setUserDetails}
              submitForm={handleSubmit}
            />
          </div>
        )}
        <ProgressBar
          stages={progressBarMapper.generateProgressBar(
            questionnaire,
            questionList
          )}
        />
      </main>
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
