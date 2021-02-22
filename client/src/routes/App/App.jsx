import PropTypes from 'prop-types';
import { enLabels } from 'translations';
import React, { useEffect, useState } from 'react';
import ArrowIcon from '../../assets/icons/icon-arrow.svg';
import Header from '../../components/Header/Header';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Questionnaire from '../../components/Questionnaire/Questionnaire';
import UserForm from '../../components/UserForm/UserForm';
import { buildAnswerScore, createLinkedList } from '../../config/factory';
import questionList from '../../config/QuestionnaireModel';
import progressBarMapper from '../../mappers/progressBarMapper';
import questionnaireMapper from '../../mappers/questionnaireMapper';
import redirectService from '../../services/redirectService';
import reportService from '../../services/reportService';
import './styles.scss';

const initialUserDetails = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  jobFunction: '',
};
const questionLinkedList = createLinkedList(questionList);

// TODO implement head and tail in linkedList could be better
const isLastQuestion = (questionNode) => !questionNode.next;
const isFirstQuestion = (questionNode) => !questionNode.previous;
const executeAsyncIfTimer = (executor, delay) => {
  if (delay) setTimeout(() => executor(), delay);
  else executor();
};

const googleAnalytics = (questionNode) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    compassQuestionNo: questionNode.index,
    compassQuestionDescription: enLabels[questionNode.data.label],
    event: 'compassQuestion',
  });
};

function App({ initialStep, animationDelay }) {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [questionnaire, setQuestionnaire] = useState({});
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [background, setBackground] = useState('');
  const [executingAnimation, setExecutingAnimation] = useState(false);
  const [currentQuestionNode, setCurrentQuestionNode] = useState(
    questionLinkedList.head
  );

  const setAppBackground = () => {
    if (currentStep === 0)
      return setBackground(`app--${currentQuestionNode.data.category}`);
    return setBackground('app--compass');
  };

  useEffect(() => {
    googleAnalytics(currentQuestionNode);
    setAppBackground();
  }, [currentQuestionNode, currentStep]);

  const handleSubmit = (userForm) => {
    const data = { ...userForm };
    data.categories = questionnaireMapper.generateQuestionnaire(questionnaire);
    reportService
      .submitSurvey(data)
      .then(() => redirectService.redirect())
      .catch((reason) => console.log('error from server ', reason));
  };

  const updateState = async (answer) => {
    setExecutingAnimation(true);
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire[currentQuestionNode.data.label] = buildAnswerScore(
      answer.label,
      answer.score
    );
    setQuestionnaire(newQuestionnaire);
    executeAsyncIfTimer(() => {
      if (isLastQuestion(currentQuestionNode)) setCurrentStep(currentStep + 1);
      else setCurrentQuestionNode(currentQuestionNode.next);
      setExecutingAnimation(false);
    }, animationDelay);
  };

  const isSelectedAnswer = (answer) => {
    if (!questionnaire[currentQuestionNode.data.label]) return false;
    return (
      answer.label === questionnaire[currentQuestionNode.data.label].answer
    );
  };

  const onPreviousClick = () => {
    if (currentStep === 0) setCurrentQuestionNode(currentQuestionNode.previous);
    else setCurrentStep(0);
  };

  const onNextClick = () => {
    if (!currentQuestionNode.next) setCurrentStep(1);
    else setCurrentQuestionNode(currentQuestionNode.next);
  };

  const renderBackButton = () => {
    return (
      <div
        aria-hidden="true"
        className="arrow-button--prev"
        onClick={() => onPreviousClick()}
      >
        <img src={ArrowIcon} alt="previous step" />
        <span>Prev</span>
      </div>
    );
  };

  const renderNextButton = () => {
    return (
      <div
        aria-hidden="true"
        className="arrow-button--next"
        onClick={() => onNextClick()}
      >
        <span>Next</span>
        <img src={ArrowIcon} alt="next step" />
      </div>
    );
  };

  const isNextButtonRendered = () =>
    !executingAnimation &&
    questionnaire[currentQuestionNode.data.label] &&
    currentStep === 0;

  return (
    <div className={`app ${background}`} data-testid={background}>
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
        <div className="progress-bar__wrapper">
          {!isFirstQuestion(currentQuestionNode) && renderBackButton()}
          <ProgressBar
            currentStage={currentQuestionNode.data.label}
            stages={progressBarMapper.generateProgressBar(
              questionnaire,
              questionList
            )}
          />
          {isNextButtonRendered() && renderNextButton()}
        </div>
      </main>
    </div>
  );
}

App.propTypes = {
  initialStep: PropTypes.number,
  animationDelay: PropTypes.number,
};

App.defaultProps = {
  initialStep: 0,
  animationDelay: null,
};

export default App;
