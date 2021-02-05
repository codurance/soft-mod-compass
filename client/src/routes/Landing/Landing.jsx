import React from 'react';
import { useHistory } from 'react-router-dom';
import CDIcon from '../../assets/icons/icon-continuous-delivery.svg';
import CrossFunctionalIcon from '../../assets/icons/icon-cross-functional-team.svg';
import CultureIcon from '../../assets/icons/icon-culture.svg';
import MaturityIcon from '../../assets/icons/icon-maturity.svg';
import XPIcon from '../../assets/icons/icon-xp-practices.svg';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import translator from '../../config/translator';
import './styles.scss';
import languageService from '../../services/languageService';

function Landing() {
  const history = useHistory();
  const {
    welcomeFirstParagraph,
    welcomeSecondParagraph,
    welcomeThirdParagraph,
    start,
    organisationalMaturity,
    continuousDelivery,
    xpPractices,
    companyCulture,
    crossFunctionalTeams,
  } = translator;

  const questionnaireRedirect = () => {
    const isSpanish = languageService.getLanguage();
    const uri =
      isSpanish === 'es' ? '/questionnaire/?lang=es' : '/questionnaire';
    history.push(uri);
  };

  return (
    <div className="landing__wrapper">
      <div className="landing">
        <div className="landing__assessment" />
        <Header />

        <main className="landing__main">
          <h1 className="landing__main__title">{welcomeFirstParagraph}</h1>
          <p>{welcomeSecondParagraph}</p>
          <div className="landing__main__icons">
            <div>
              <img src={MaturityIcon} alt="Compass" />
              <p>{organisationalMaturity}</p>
            </div>
            <div>
              <img src={CrossFunctionalIcon} alt="Compass" />
              <p>{crossFunctionalTeams}</p>
            </div>
            <div>
              <img src={CDIcon} alt="Compass" />
              <p>{continuousDelivery}</p>
            </div>
            <div>
              <img src={XPIcon} alt="Compass" />
              <p>{xpPractices}</p>
            </div>
            <div>
              <img src={CultureIcon} alt="Compass" />
              <p>{companyCulture}</p>
            </div>
          </div>
          <p>{welcomeThirdParagraph}</p>

          <Button label={start} clickCallback={questionnaireRedirect} />
        </main>
      </div>
    </div>
  );
}

export default Landing;
