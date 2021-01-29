import PropTypes from 'prop-types';
import React, { useState } from 'react';
import questionList from '../../config/QuestionnaireModel';
import translator from '../../config/translator';
import AnswerOption from '../AnswerOption/AnswerOption';
import './styles.scss';
import { createLinkedList, buildAnswerScore } from '../../config/factory';
import Question from '../Question/Question';

const questionLinkedList = createLinkedList(questionList);

function Questionnaire({ finishQuestionnaire }) {
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentQuestionNode, setCurrentQuestionNode] = useState(
    questionLinkedList.head
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

  function isFirstQuestion() {
    return !currentQuestionNode.previous;
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

  return (
    <div className="questionnaire wrapper">
      <Question
        question={currentQuestionNode.data}
        updateQuestionnaire={updateState}
        isSelectedFunction={(answer) => isSelected(answer)}
      />
      {!isFirstQuestion() && renderBackButton()}
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  finishQuestionnaire: PropTypes.func.isRequired,
};
