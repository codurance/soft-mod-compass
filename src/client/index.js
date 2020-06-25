const cookieMessageFactory = require('./cookieMessage');
const hubspotEmbeddedFactory = require('./hubspotEmbedded');
const typeformFactory = require('./typeform');

const onReady = () => {
  const cookieMessage = cookieMessageFactory();
  const hubspotEmbedded = hubspotEmbeddedFactory(cookieMessage);
  const typeform = typeformFactory();

  hubspotEmbedded.initializeHubspot();
  typeform.initializeTypeformSurvey();
  typeform.ensureSurveyAlwaysHasFocus();
};

document.addEventListener('DOMContentLoaded', onReady);
