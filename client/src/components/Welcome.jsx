import React from 'react';
import {
  welcomeFirstParagraph,
  welcomeSecondParagraph,
} from '../config/en-labels.json';

function Welcome() {
  return (
    <>
      <p>{welcomeFirstParagraph}</p>
      <p>{welcomeSecondParagraph}</p>
    </>
  );
}

export default Welcome;
