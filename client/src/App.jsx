import React, { useState } from 'react';
import surveyConfig from './config/surveyModel.json';
import translator from './config/translator';

function App() {
  const [state, setState] = useState();

  const handleChoseAnswer = (event) => {
    setState(event.target.value);
  };

  const getSelectedClass = (answer) => {
    if (answer === state) return 'selected';
    return '';
  };

  function renderAnswers() {
    return surveyConfig.answers.map(
      (answer) => (
        <button
          key={answer.label}
          type="button"
          value={translator[answer.label]}
          className={getSelectedClass(translator[answer.label])}
          onClick={handleChoseAnswer}
        >
          {translator[answer.label]}
        </button>
      ),
    );
  }

  return (
    <div>
      <span>
        Decision making for IT product and projects is
        based on what will carry the most value for the business.This question is required.
      </span>
      {renderAnswers()}
    </div>
  );
}

export default App;
