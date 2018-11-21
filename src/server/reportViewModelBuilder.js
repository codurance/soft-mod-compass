const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const reportViewModelBuilder = (typeformClient) => {
  return buildReportViewModelFor

  function buildReportViewModelFor (submissionId) {
    return getSurveySubmissionFor(submissionId)
      .then(([choices, answers]) => {
        return reportViewModel(categoryData, choices, answers)
      })
  }

  function getSurveySubmissionFor (submissionId) {
    return Promise.all(
      [
        typeformClient.getQuestionChoices(),
        typeformClient.surveyAnswersFor(submissionId)
      ])
  }
}

module.exports = reportViewModelBuilder
