const typeformFactory = require('./typeform');

const onReady = () => {
  const typeform = typeformFactory();

  typeform.initializeTypeformSurvey();
  typeform.ensureSurveyAlwaysHasFocus();
};

document.addEventListener('DOMContentLoaded', onReady);
