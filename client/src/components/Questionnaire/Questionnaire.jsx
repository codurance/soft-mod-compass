import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Question from '../Question/Question';
import ReportCover from '../ReportCover/ReportCover';
import './styles.scss';

function Questionnaire({
  currentQuestion,
  onClickAnswer,
  isSelectedAnswer,
  children,
}) {
  return (
    <div className="questionnaire">
      <SwitchTransition className="animation-wrapper">
        <CSSTransition
          timeout={500}
          appear
          key={currentQuestion.label}
          classNames="fade"
        >
          <Question
            question={currentQuestion}
            onClickAnswer={onClickAnswer}
            isSelectedFunction={isSelectedAnswer}
          />
        </CSSTransition>
      </SwitchTransition>

      {children}
    </div>
  );
}

export default Questionnaire;

Questionnaire.propTypes = {
  currentQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  isSelectedAnswer: PropTypes.func.isRequired,
  children: PropTypes.element,
};

Questionnaire.defaultProps = {
  children: null,
};
