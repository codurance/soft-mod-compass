const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const reportViewModelBuilder = (typeformClient, getHubspotUserDetails) => {

  function buildReportViewModelFor(submissionId) {
    return getReportData(submissionId)
      .then(([choices, answers, userDetails]) => {
        return reportViewModel(categoryData, choices, answers, userDetails)
      });
  }

  function getReportData(submissionId) {
    return Promise.all(
      [
        typeformClient.getQuestionChoices(),
        typeformClient.surveyAnswersFor(submissionId),
        getHubspotUserDetails(submissionId)
      ])
  }

  return buildReportViewModelFor
}

module.exports = reportViewModelBuilder
