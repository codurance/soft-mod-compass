import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Questionnaire from '../../components/Questionnaire/Questionnaire';
import UserForm from '../../components/UserForm/UserForm';
import questionList from '../../config/QuestionnaireModel';
import progressBarMapper from '../../mappers/progressBarMapper';
import questionnaireMapper from '../../mappers/questionnaireMapper';
import redirectService from '../../services/redirectService';
import reportService from '../../services/reportService';
import './styles.scss';
import { buildAnswerScore, createLinkedList } from '../../config/factory';
import ArrowIcon from '../../assets/icons/icon-arrow.svg';

const initialUserDetails = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};
const questionLinkedList = createLinkedList(questionList);
function App({ initialStep }) {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [background, setBackground] = useState('');
  const [currentQuestionNode, setCurrentQuestionNode] = useState(
    questionLinkedList.head
  );

  useEffect(() => {
    setBackground(currentQuestionNode.data.category);
  }, [currentQuestionNode]);

  const handleSubmit = (userForm) => {
    const data = { ...userForm };
    data.categories = questionnaireMapper.generateQuestionnaire(questionnaire);
    reportService
      .submitSurvey(data)
      .then(() => redirectService.redirect())
      .catch((reason) => console.log('error from server ', reason));
  };

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
    if (isLastQuestion(currentQuestionNode)) setCurrentStep(currentStep + 1);
    else setCurrentQuestionNode(currentQuestionNode.next);
    setQuestionnaire(newQuestionnaire);
  };

  function isSelectedAnswer(answer) {
    if (!questionnaire[currentQuestionNode.data.label]) return false;
    return (
      answer.label === questionnaire[currentQuestionNode.data.label].answer
    );
  }

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

  return (
    <div className={`app app--${background}`}>
      <Header />
      <main>
        {currentStep === 0 && (
          <Questionnaire
            currentQuestion={currentQuestionNode.data}
            onClickAnswer={updateState}
            isSelectedAnswer={isSelectedAnswer}
          />
        )}
        {currentStep === 1 && (
          <UserForm
            initialState={userDetails}
            updateUserForm={setUserDetails}
            submitForm={handleSubmit}
          />
        )}
        {!isFirstQuestion() && renderBackButton()}
        <ProgressBar
          currentStage={currentQuestionNode.data.label}
          stages={progressBarMapper.generateProgressBar(
            questionnaire,
            questionList
          )}
        />
        {questionnaire[currentQuestionNode.data.label] && renderNextButton()}
      </main>
    </div>
  );
}

App.propTypes = {
  initialStep: PropTypes.number,
};

App.defaultProps = {
  initialStep: 0,
};

export default App;
