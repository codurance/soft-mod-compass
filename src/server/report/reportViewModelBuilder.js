const reportViewModel = require('./reportViewModel');
const categoryData = require('./categoryData');
const getHubspotUserDetails = require('./getHubspotUserDetails');
const typeformClient = require('../survey/typeformClient');

async function buildReportViewModelFor(submissionUuid) {
  const choices = await typeformClient.getQuestionChoices();
  console.log(`Fetching survey answers from Typeform for '${submissionUuid}'`);
  const answers = await typeformClient.surveyAnswersFor(submissionUuid);
  console.log(`Fetching user details from Hubspot for '${submissionUuid}'`);
  const userDetails = await getHubspotUserDetails(submissionUuid);

  console.log(`User details for '${submissionUuid}'`, userDetails);

  return reportViewModel(categoryData, choices, answers, userDetails);
}

module.exports = buildReportViewModelFor;
