import React, { useState } from 'react';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';
import InputText from './components/InputText';
import reportService from './services/reportService';
import Questionnaire from './components/Questionaire';

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

  const handleChangeText = (fieldName) => (event) => {
    const copy = { ...textFields };
    copy[fieldName] = event.target.value;
    setTextFields(copy);
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
      <InputText
        textValue={textFields.firstName}
        onChangeCallBack={handleChangeText('firstName')}
        label={translator[surveyConfig.firstNameLabel]}
      />
      <InputText
        textValue={textFields.lastName}
        onChangeCallBack={handleChangeText('lastName')}
        label={translator[surveyConfig.lastNameLabel]}
      />
      <InputText
        textValue={textFields.companyName}
        onChangeCallBack={handleChangeText('companyName')}
        label={translator[surveyConfig.companyLabel]}
      />
      <InputText
        textValue={textFields.email}
        onChangeCallBack={handleChangeText('email')}
        label={translator[surveyConfig.emailLabel]}
      />
      <button type="submit" onClick={handleSubmit}>
        {translator[surveyConfig.submitLabel]}
      </button>
    </div>
  );
}

export default App;
