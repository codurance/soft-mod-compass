const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const reportViewModelBuilder = (typeformClient, getHubspotUserDetails) => {

  async function buildReportViewModelFor (submissionId) {
    try {
      const choices = await typeformClient.getQuestionChoices()
      const answers = await typeformClient.surveyAnswersFor(submissionId)
      const userDetails = await getHubspotUserDetails(submissionId)
      return reportViewModel(categoryData, choices, answers, userDetails)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return buildReportViewModelFor
}

module.exports = reportViewModelBuilder
