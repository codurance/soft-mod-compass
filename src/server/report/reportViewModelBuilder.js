const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const reportViewModelBuilder = (typeformClient, getHubspotUserDetails) => {
  console.log('STARTING VEIW MODAL BUILDER')

  function buildReportViewModelFor (submissionId) {
    console.log('GETTING REPORT DATA')

    return getReportData(submissionId)
      .then(([choices, answers, userDetails]) => {
        console.log('FINISHED GETTING REPORT DATA')
        console.log('STARTING REPORT VIEW MODAL')
        return reportViewModel(categoryData, choices, answers, userDetails)
      })
  }

  function getReportData (submissionId) {
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
