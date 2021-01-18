import React from 'react';
import translator from '../config/translator';

function Welcome() {
  return (
    <>
      <p>{translator.welcomeFirstParagraph}</p>
      <p>{translator.welcomeSecondParagraph}</p>
    </>
  );
}

export default Welcome;
