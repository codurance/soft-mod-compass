import React, { useState } from 'react';
import AnswerButton from './components/AnswerButton';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';
import InputText from './components/InputText';
import { submitSurvey } from './services/reportService';

const initialTextFieldsState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};
function App() {
  const [state, setState] = useState('');
  const [textFields, setTextFields] = useState(initialTextFieldsState);

  const handleChoseAnswer = (event) => {
    setState(event.target.value);
  };

  const handleChangeText = (fieldName) => (event) => {
    const copy = { ...textFields };
    copy[fieldName] = event.target.value;
    setTextFields(copy);
  };

  const handleSubmit = () => {
    submitSurvey({ foo: 'foo' });
  };

  function renderAnswers() {
    return surveyConfig.answers.map((answer) => (
      <AnswerButton
        key={answer.label}
        clickCallback={handleChoseAnswer}
        answer={translator[answer.label]}
        selectedAnswer={state}
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
        label="First Name"
      />
      <InputText
        textValue={textFields.lastName}
        onChangeCallBack={handleChangeText('lastName')}
        label="Last Name"
      />
      <InputText
        textValue={textFields.companyName}
        onChangeCallBack={handleChangeText('companyName')}
        label="Company Name"
      />
      <InputText
        textValue={textFields.email}
        onChangeCallBack={handleChangeText('email')}
        label="Email"
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
