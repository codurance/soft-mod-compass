import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import translator from '../../config/translator';
import CoduranceLogo from '../../assets/icons/logo-codurance.svg';
import CompassLogo from '../../assets/icons/logo-compass.svg';
import MaturityIcon from '../../assets/icons/icon-maturity.svg';
import './styles.scss';

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
    <div className="landing">
      <header className="landing__header">
        <img src={CoduranceLogo} alt="Codurance" />

        <span className="landing__header__separator" />
        <img src={CompassLogo} alt="Compass" />
      </header>

      <main className="landing__main">
        <h1>{welcomeFirstParagraph}</h1>
        <p>{welcomeSecondParagraph}</p>
        <div className="landing__main__icons">
          <div>
            <img src={CompassLogo} alt="Compass" />
            <p>Organisational Maturity</p>
          </div>

          <div>
            <img src={CompassLogo} alt="Compass" />
            <p>Organisational Maturity</p>
          </div>
          <div>
            <img src={CompassLogo} alt="Compass" />

            <p>Organisational Maturity</p>
          </div>
          <div>
            <img src={CompassLogo} alt="Compass" />
            <p>Organisational Maturity</p>
          </div>
          <div>
            <img src={CompassLogo} alt="Compass" />
            <p>Organisational Maturity</p>
          </div>
        </div>
        <p>{welcomeThirdParagraph}</p>
        <Button label={start} clickCallback={questionnaireRedirect} />
      </main>
    </div>
  );
}

export default Landing;
