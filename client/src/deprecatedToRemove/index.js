const cookieMessageFactory = require('./cookieMessage');
const loadHubspot = require('./loadHubspot');
const typeformFactory = require('../typeform');

const onReady = () => {
  const cookieMessage = cookieMessageFactory();
  const typeform = typeformFactory();

  cookieMessage.onConsent(loadHubspot);
  typeform.initializeTypeformSurvey();
  typeform.ensureSurveyAlwaysHasFocus();
};

document.addEventListener('DOMContentLoaded', onReady);
