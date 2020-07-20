const reportViewModel = require('./reportViewModel');
const categoryData = require('./categoryData');
const getHubspotUserDetails = require('./getHubspotUserDetails');
const typeformClient = require('../survey/typeformClient');

async function buildReportViewModelFor(submissionUuid) {
  const choices = await typeformClient.getQuestionChoices();
  const answers = await typeformClient.surveyAnswersFor(submissionUuid);
  const userDetails = await getHubspotUserDetails(submissionUuid);

  console.log(`User details for '${submissionUuid}'`, userDetails);

  return reportViewModel(categoryData, choices, answers, userDetails);
}

module.exports = buildReportViewModelFor;
