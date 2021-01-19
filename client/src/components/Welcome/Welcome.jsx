import React from 'react';
import PropTypes from 'prop-types';
import translator from '../../config/translator';
import Button from '../Button/Button';

function Welcome({ clickCallback }) {
  return (
    <>
      <p>{translator.welcomeFirstParagraph}</p>
      <p>{translator.welcomeSecondParagraph}</p>
      <Button label="Start" clickCallback={clickCallback} />
    </>
  );
}

Welcome.propTypes = {
  clickCallback: PropTypes.func.isRequired,
};

export default Welcome;
