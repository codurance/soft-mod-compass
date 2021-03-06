const reportViewModel = require('./reportViewModel');
const categoryDefinitions = require('./categoryDefinitions');
const typeformClient = require('../survey/typeformClient');
const roundCategoryScoresToNearestQuarter = require('./roundCategoryScoresToNearestQuarter');
const hubspotApi = require('./hubspot/api');

async function buildReportViewModelFor(submissionUuid) {
  const choices = await typeformClient.getQuestionChoices();
  console.log(`Fetching survey answers from Typeform for '${submissionUuid}'`);
  const answers = await typeformClient.surveyAnswersFor(submissionUuid);
  console.log(`Fetching user details from Hubspot for '${submissionUuid}'`);
  const userDetails = await hubspotApi.getFormSubmission(submissionUuid);

  console.log(`User details for '${submissionUuid}'`, userDetails);

  const viewModel = reportViewModel(
    categoryDefinitions,
    choices,
    answers,
    userDetails
  );

  return roundCategoryScoresToNearestQuarter(viewModel);
}

module.exports = buildReportViewModelFor;
