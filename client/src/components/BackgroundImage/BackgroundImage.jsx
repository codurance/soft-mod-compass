import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './styles.scss';

export default function BackgroundImage({ imageClass, testId }) {
  return (
    <SwitchTransition className="animation-wrapper">
      <CSSTransition
        timeout={300}
        appear
        key={imageClass}
        classNames="simple-fade"
      >
        <div className={imageClass} data-testid={testId} />
      </CSSTransition>
    </SwitchTransition>
  );
}

BackgroundImage.propTypes = {
  testId: PropTypes.string,
  imageClass: PropTypes.string.isRequired,
};

BackgroundImage.defaultProps = {
  testId: null,
};
