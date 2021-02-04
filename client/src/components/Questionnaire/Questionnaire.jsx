import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ArrowIcon from '../../assets/icons/icon-arrow.svg';
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
      <div
        aria-hidden="true"
        className="arrow-button--prev"
        onClick={() => setCurrentQuestionNode(currentQuestionNode.previous)}
      >
        <img src={ArrowIcon} alt="previous step" />
        <span>Prev</span>
      </div>
    );
  }

  function renderNextButton() {
    return (
      <div
        aria-hidden="true"
        className="arrow-button--next"
        onClick={() => setCurrentQuestionNode(currentQuestionNode.next)}
      >
        <span>Next</span>
        <img src={ArrowIcon} alt="next step" />
      </div>
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
    <div className="questionnaire">
      <div className="questionnaire__question-wrapper">
        <Question
          question={currentQuestionNode.data}
          onClickAnswer={updateState}
          isSelectedFunction={isSelected}
        />

        <div className="buttons-wrapper">
          {!isFirstQuestion() && renderBackButton()}
          {questionnaire[currentQuestionNode.data.label] && renderNextButton()}
        </div>
      </div>
      <div
        className={`questionnaire__assessment--${currentQuestionNode.data.category}`}
        data-testid={`background-${currentQuestionNode.data.category}`}
      />
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  onFinishQuestionnaire: PropTypes.func.isRequired,
  onUpdateQuestionnaire: PropTypes.func.isRequired,
};
