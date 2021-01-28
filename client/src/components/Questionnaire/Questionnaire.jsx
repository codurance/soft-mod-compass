import PropTypes from 'prop-types';
import React, { useState } from 'react';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import AnswerOption from '../AnswerOption/AnswerOption';
import './styles.scss';
import { createLinkedList, buildAnswerScore } from '../../config/factory';

const linkedList = createLinkedList(questionList);

function Questionnaire({ finishQuestionnaire }) {
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentQuestionNode, setCurrentQuestionNode] = useState(
    linkedList.head
  );

  function renderBackButton() {
    return (
      <button
        value="back"
        onClick={() => setCurrentQuestionNode(currentQuestionNode.previous)}
      >
        back
      </button>
    );
  }

  function isLastQuestion() {
    return !currentQuestionNode.next;
  }

  const updateState = (answer) => {
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire[currentQuestionNode.data.label] = buildAnswerScore(
      answer.label,
      answer.score
    );
    if (isLastQuestion(currentQuestionNode))
      finishQuestionnaire(newQuestionnaire);
    else setQuestionnaire(newQuestionnaire);

    setCurrentQuestionNode(currentQuestionNode.next);
  };

  function isSelected(answer) {
    if (!questionnaire[currentQuestionNode.data.label]) return false;
    return (
      answer.label === questionnaire[currentQuestionNode.data.label].answer
    );
  }

  function renderAnswersFor(question) {
    return (
      <>
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
        {renderBackButton()}
      </>
    );
  }

  return (
    <div className="questionnaire wrapper">
      <p className="questionnaire__question">
        {translator[currentQuestionNode.data.label]}
      </p>
      {renderAnswersFor(currentQuestionNode.data)}
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  finishQuestionnaire: PropTypes.func.isRequired,
};
