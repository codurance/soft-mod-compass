import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import translator from '../../config/translator';

function Landing() {
  const history = useHistory();
  const {
    welcomeFirstParagraph,
    welcomeSecondParagraph,
    welcomeThirdParagraph,
    start,
  } = translator;

  const questionnaireRedirect = () => {
    history.push('/questionnaire');
  };

  return (
    <>
      <header>Icons</header>

      <main>
        <h1>{welcomeFirstParagraph}</h1>
        <p>{welcomeSecondParagraph}</p>
        <div className="icons" />
        <p>{welcomeThirdParagraph}</p>
        <Button label={start} clickCallback={questionnaireRedirect} />
      </main>
    </>
  );
}

export default Landing;
