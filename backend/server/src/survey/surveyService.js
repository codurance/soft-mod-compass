const SurveyState = require('./SurveyState');
const {
  updateSurveyToSucceedState,
  getSurveyById,
  saveRequestedSurvey,
  updateSurveyToFailedState,
} = require('./surveyRepository');

const { submitSurvey } = require('./surveyOrchestrator');

function propagateFailedSurveyError(e, surveyId, surveyBody) {
  console.error(e);
  const failedSurveyError = {
    failedSurvey: {
      surveyId: surveyId,
      surveyRequestBody: surveyBody,
      errorDetails: e.message,
    },
  };
  throw new Error(JSON.stringify(failedSurveyError));
}

function saveFailedSurvey(surveyId) {
  updateSurveyToFailedState(surveyId).catch((reason) => console.error(reason));
}

async function processSurvey(surveyBody) {
  let surveyId;
  try {
    surveyId = await saveRequestedSurvey(surveyBody);
    await submitSurvey(surveyBody);
    await updateSurveyToSucceedState(surveyId);
    return surveyId;
  } catch (e) {
    saveFailedSurvey(surveyId);
    propagateFailedSurveyError(e, surveyId, surveyBody);
  }
}

async function reProcessSurvey(id) {
  // upgrade the method getFailedSurveyById
  let survey;
  try {
    survey = await getSurveyById(id);
    if (survey.surveyState === SurveyState.SUCCEED) return 'already succeed';
    await submitSurvey(survey.bodyRequest);
    await updateSurveyToSucceedState(id);
    return SurveyState.SUCCEED;
  } catch (e) {
    propagateFailedSurveyError(e, id, survey.bodyRequest);
  }
}

module.exports = {
  processSurvey,
  reProcessSurvey,
};
