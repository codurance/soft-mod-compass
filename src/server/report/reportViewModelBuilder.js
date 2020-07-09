const reportViewModel = require('./reportViewModel');
const categoryData = require('./categoryData');
const getHubspotUserDetails = require('./getHubspotUserDetails');
const typeformClient = require('../survey/typeformClient');

async function buildReportViewModelFor(submissionUuid) {
  try {
    const choices = await typeformClient.getQuestionChoices();
    const answers = await typeformClient.surveyAnswersFor(submissionUuid);
    const userDetails = await getHubspotUserDetails(submissionUuid);

    console.log('USER DETES:', userDetails);

    return reportViewModel(categoryData, choices, answers, userDetails);
  } catch (error) {
    console.log(
      `There was a problem processing report for '${submissionUuid}'`
    );
    console.log(error);
    throw error;
  }
}

module.exports = buildReportViewModelFor;
