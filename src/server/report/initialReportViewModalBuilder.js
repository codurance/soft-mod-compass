const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const InitialReportViewModelBuilder = (typeformClient) => {
  function buildInitialReportViewModelFor (submissionId) {
    return getReportData(submissionId)
      .then(([choices, answers]) => {
        return reportViewModel(categoryData, choices, answers)
      })
  }

  function getReportData (submissionId) {
    return Promise.all(
      [
        typeformClient.getQuestionChoices(),
        typeformClient.surveyAnswersFor(submissionId)
      ])
  }

  return buildInitialReportViewModelFor
}

module.exports = InitialReportViewModelBuilder
