import React from 'react';
import translator from '../config/translator';
import Button from './Button';

function Welcome() {
  return (
    <>
      <p>{translator.welcomeFirstParagraph}</p>
      <p>{translator.welcomeSecondParagraph}</p>
      <Button label="Start" clickCallback={() => {}} />
    </>
  );
}

export default Welcome;
