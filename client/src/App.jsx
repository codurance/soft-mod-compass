import React, { useState } from 'react';
import AnswerButton from './components/AnswerButton';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';
import InputText from './components/InputText';
import reportService from './services/reportService';

const initialTextFieldsState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};
const initialAnswerState = {
  label: '',
  score: ''
}

function App() {
  const [state, setState] = useState(initialAnswerState);
  const [textFields, setTextFields] = useState(initialTextFieldsState);

  const handleChoseAnswer = (answer) => {
    setState({
      label: translator[answer.label],
      score: answer.score
    });
  };

  const handleChangeText = (fieldName) => (event) => {
    const copy = { ...textFields };
    copy[fieldName] = event.target.value;
    setTextFields(copy);
  };

  const handleSubmit = () => {
    const data = { ...textFields };
    data.answer = state;
    reportService.submitSurvey(data);
  };

  function renderAnswers() {
    return surveyConfig.answers.map((answer) => (
      <AnswerButton
        key={answer.label}
        clickCallback={() => handleChoseAnswer(answer)}
        answer={translator[answer.label]}
        selectedAnswer={state.label || ''}
      />
    ));
  }

  return (
    <div>
      <span>
        Decision making for IT product and projects is based on what will carry
        the most value for the business.This question is required.
      </span>
      {renderAnswers()}
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
