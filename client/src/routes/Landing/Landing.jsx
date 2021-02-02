import React from 'react';
import { useHistory } from 'react-router-dom';
import CDIcon from '../../assets/icons/icon-continuous-delivery.svg';
import CrossFunctionalIcon from '../../assets/icons/icon-cross-functional-team.svg';
import CultureIcon from '../../assets/icons/icon-culture.svg';
import MaturityIcon from '../../assets/icons/icon-maturity.svg';
import XPIcon from '../../assets/icons/icon-xp-practices.svg';
import CoduranceLogo from '../../assets/icons/logo-codurance.svg';
import CompassLogo from '../../assets/icons/logo-compass.svg';
import Button from '../../components/Button/Button';
import translator from '../../config/translator';
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
        <h1 className="landing__main__title">{welcomeFirstParagraph}</h1>
        <p>{welcomeSecondParagraph}</p>
        <div className="landing__main__icons">
          <div>
            <img src={MaturityIcon} alt="Compass" />
            <p>Organisational Maturity</p>
          </div>
          <div>
            <img src={CrossFunctionalIcon} alt="Compass" />
            <p>Cross-Functional Teams</p>
          </div>
          <div>
            <img src={CDIcon} alt="Compass" />
            <p>Continuous Delivery</p>
          </div>
          <div>
            <img src={XPIcon} alt="Compass" />
            <p>XP Practices</p>
          </div>
          <div>
            <img src={CultureIcon} alt="Compass" />
            <p>Company Culture</p>
          </div>
        </div>
        <p>{welcomeThirdParagraph}</p>

        <Button label={start} clickCallback={questionnaireRedirect} />
      </main>
    </div>
  );
}

export default Landing;
