import React from 'react';
import PropTypes from 'prop-types';
import translator from '../../config/translator';
import Button from '../Button/Button';
import './styles.scss';

function Welcome({ clickCallback }) {
  return (
    <div className="welcome">
      <img
        className="welcome__image"
        src="https://images.typeform.com/images/BQieVdsGyDW3/image/default"
        alt="Compass by Codurance"
      />

      <div className="welcome__text">
        <p>{translator.welcomeFirstParagraph}</p>
        <p>{translator.welcomeSecondParagraph}</p>
      </div>
      <Button label="Start" clickCallback={clickCallback} />
    </div>
  );
}

Welcome.propTypes = {
  clickCallback: PropTypes.func.isRequired,
};

export default Welcome;
