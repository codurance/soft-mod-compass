import React, { useState } from 'react';

function App() {
  const [state, setState] = useState();

  const handleChoseAnswer = (event) => {
    setState(event.target.value);
  };

  const getSelectedClass = (answer) => {
    if (answer === state) return 'selected';
    return '';
  };
  return (
    <div>
      <span>
        Decision making for IT product and projects is
        based on what will carry the most value for the business.This question is required.
      </span>
      <button type="button" value="Strongly Agree" className={getSelectedClass('Strongly Agree')} onClick={handleChoseAnswer}>Strongly Agree</button>
      <button type="button" value="Agree" className={getSelectedClass('Agree')} onClick={handleChoseAnswer}>Agree</button>
      <button type="button">Neither Agree Nor Disagree</button>
      <button type="button">Disagree</button>
      <button type="button">Strongly Disagree</button>
    </div>
  );
}

export default App;
