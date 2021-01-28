import PropTypes from 'prop-types';
import React, { useState } from 'react';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import AnswerOption from '../AnswerOption/AnswerOption';
import './styles.scss';
import { createQuestion } from '../../config/factory';

function Questionnaire({ handleQuestionnaire }) {
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const updateState = (answer) => {
    const questionLabel = questionList[currentQuestion].label;
    const newState = { ...questionnaire };
    newState[questionLabel] = createQuestion(answer.label, answer.score);
    if (currentQuestion === questionList.length - 1)
      handleQuestionnaire(newState);
    else setQuestionnaire(newState);

    setCurrentQuestion(currentQuestion + 1);
  };

  function isSelected(answer) {
    if (!questionnaire[questionList[currentQuestion].label]) return false;
    return (
      answer.label === questionnaire[questionList[currentQuestion].label].answer
    );
  }

  function renderAnswersFor(question) {
    return (
      <ul className="questionnaire__answer-list">
        {question.answers.map((answer) => (
          <AnswerOption
            key={answer.label}
            clickCallback={() => updateState(answer)}
            answer={translator[answer.label]}
            selectedAnswer={isSelected(answer)}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="questionnaire wrapper">
      <p className="questionnaire__question">
        {translator[questionList[currentQuestion].label]}
      </p>
      {renderAnswersFor(questionList[currentQuestion])}
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  handleQuestionnaire: PropTypes.func.isRequired,
};
