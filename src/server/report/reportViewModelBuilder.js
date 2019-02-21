const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const reportViewModelBuilder = (typeformClient, loadContent) => {
  function buildReportViewModelFor (submissionId) {
    return getSurveySubmissionFor(submissionId)
      .then(([choices, answers]) => {
        return reportViewModel(loadContent, categoryData, choices, answers)
      })
  }

  function getSurveySubmissionFor (submissionId) {
    return Promise.all(
      [
        typeformClient.getQuestionChoices(),
        typeformClient.surveyAnswersFor(submissionId)
      ])
  }

  return buildReportViewModelFor
}

module.exports = reportViewModelBuilder