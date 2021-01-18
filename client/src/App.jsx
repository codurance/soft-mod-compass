import React, { useState } from 'react';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';
import InputText from './components/InputText';
import reportService from './services/reportService';
import Questionnaire from './components/Questionaire';
import UserForm from './components/UserForm';

const initialTextFieldsState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};
const initialAnswerState = {
  label: '',
  score: '',
};

function App() {
  const [textFields, setTextFields] = useState(initialTextFieldsState);
  const [questionnaire, setQuestionnaire] = useState(initialAnswerState);

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
  };

  return (
    <div>
      <Questionnaire
        initialState={questionnaire}
        handleQuestionnaire={updateQuestionnaire}
      />
      <UserForm initialState={textFields} updateUserForm={updateUserForm} />
      <button type="submit" onClick={handleSubmit}>
        {translator[surveyConfig.submitLabel]}
      </button>
    </div>
  );
}

export default App;
