import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Questionnaire from '../../components/Questionnaire/Questionnaire';
import UserForm from '../../components/UserForm/UserForm';
import questionList from '../../config/QuestionnaireModel';
import progressBarMapper from '../../mappers/progressBarMapper';
import questionnaireMapper from '../../mappers/questionnaireMapper';
import redirectService from '../../services/redirectService';
import reportService from '../../services/reportService';
import './styles.scss';

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
  const [background, setBackground] = useState('');

  const handleSubmit = (userForm) => {
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
    <div className={`app app--${background}`}>
      <Header />
      <main>
        {currentStep === 0 && (
          <Questionnaire
            setBackground={setBackground}
            onFinishQuestionnaire={updateQuestionnaire}
            onUpdateQuestionnaire={setQuestionnaire}
          />
        )}
        {currentStep === 1 && (
          <UserForm
            initialState={userDetails}
            updateUserForm={setUserDetails}
            submitForm={handleSubmit}
          />
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
