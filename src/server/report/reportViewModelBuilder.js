const reportViewModel = require('./reportViewModel')
const categoryData = require('./categoryData')

const reportViewModelBuilder = (typeformClient, getHubspotUserDetails) => {
  async function buildReportViewModelFor (submissionUuid) {
    try {
      const choices = await typeformClient.getQuestionChoices()
      const answers = await typeformClient.surveyAnswersFor(submissionUuid)
      const userDetails = await getHubspotUserDetails(submissionUuid)

      console.log('USER DETES:', userDetails)

      return reportViewModel(categoryData, choices, answers, userDetails)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return buildReportViewModelFor
}

module.exports = reportViewModelBuilder
