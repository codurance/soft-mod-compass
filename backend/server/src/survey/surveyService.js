const {
  updateSurveyToSucceedState,
  getSurveyById,
  saveRequestedSurvey,
} = require('./surveyRepository');
const { submitSurvey } = require('./surveyOrchestrator');

async function processSurvey(surveyBody) {
  const surveyId = await saveRequestedSurvey(surveyBody);
  await submitSurvey(surveyBody);
  await updateSurveyToSucceedState(surveyId);
  return surveyId;
}

async function reProcessSurvey(id) {
  // upgrade the method getFailedSurveyById
  const survey = await getSurveyById(id);
  await submitSurvey(survey.bodyRequest);
  await updateSurveyToSucceedState(id);
}

module.exports = {
  processSurvey,
  reProcessSurvey,
};
