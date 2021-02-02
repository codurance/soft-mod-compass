import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { buildAnswerScore, createLinkedList } from '../../config/factory';
import questionList from '../../config/QuestionnaireModel';
import Question from '../Question/Question';
import './styles.scss';

const questionLinkedList = createLinkedList(questionList);

function Questionnaire({ onFinishQuestionnaire, onUpdateQuestionnaire }) {
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentQuestionNode, setCurrentQuestionNode] = useState(
    questionLinkedList.head
  );

  function renderBackButton() {
    return (
      <button
        type="button"
        value="back"
        onClick={() => setCurrentQuestionNode(currentQuestionNode.previous)}
      >
        back
      </button>
    );
  }

  function renderNextButton() {
    return (
      <button
        type="button"
        value="next"
        onClick={() => setCurrentQuestionNode(currentQuestionNode.next)}
      >
        next
      </button>
    );
  }

  function isLastQuestion() {
    return !currentQuestionNode.next;
  }

  function isFirstQuestion() {
    return !currentQuestionNode.previous;
  }

  const updateState = (answer) => {
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire[currentQuestionNode.data.label] = buildAnswerScore(
      answer.label,
      answer.score
    );
    setQuestionnaire(newQuestionnaire);
    if (isLastQuestion(currentQuestionNode))
      onFinishQuestionnaire(newQuestionnaire);
    else onUpdateQuestionnaire(newQuestionnaire);

    setCurrentQuestionNode(currentQuestionNode.next);
  };

  function isSelected(answer) {
    if (!questionnaire[currentQuestionNode.data.label]) return false;
    return (
      answer.label === questionnaire[currentQuestionNode.data.label].answer
    );
  }

  return (
    <div className="questionnaire wrapper">
      <Question
        question={currentQuestionNode.data}
        onClickAnswer={updateState}
        isSelectedFunction={isSelected}
      />
      {!isFirstQuestion() && renderBackButton()}
      {questionnaire[currentQuestionNode.data.label] && renderNextButton()}
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  onFinishQuestionnaire: PropTypes.func.isRequired,
  onUpdateQuestionnaire: PropTypes.func.isRequired,
};
