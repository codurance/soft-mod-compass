const reportViewModel = require('./reportViewModel')
const typeformClient = require('./typeformClient')
const categoryData = require('./categoryData')

const buildReportViewModelFor = (submissionId) => {
    return getSurveySubmissionFor(submissionId)
        .then(([choices, answers]) => {
            return reportViewModel(categoryData, choices, answers)
        })
}

const getSurveySubmissionFor = (submissionId) => {
    return Promise.all(
        [
            typeformClient.getQuestionChoices(),
            typeformClient.surveyAnswersFor(submissionId)
        ])
}

module.exports = buildReportViewModelFor