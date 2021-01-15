import React, { useState } from 'react';
import AnswerButton from './components/AnswerButton';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';

function App() {
  const [state, setState] = useState('');

  const handleChoseAnswer = (event) => {
    setState(event.target.value);
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
    </div>
  );
}

export default App;
