const rp = require('request-promise')

const typeformUrl = 'https://mashooqbadar.typeform.com'
const formId = 'yiRLeY'

module.exports = {
  surveyAnswersFor,
  getQuestionChoices
}

function surveyAnswersFor (uuid) {
  const options = {
    uri: `${typeformUrl}/forms/${formId}/responses?query=${uuid}`,
    headers: {
      Authorization: 'Bearer 3U8FHS7YZV4GCpbwyxNUybKaAQAQZAzFyXoqCFeGqYRk'
    },
    json: true
  }

  return rp(options)
    .then(results => results.items[0].answers.map(answer => answer.choice.label))
}

function getQuestionChoices () {
  const options = {
    uri: `${typeformUrl}/forms/${formId}`,
    headers: {
      Authorization: 'Bearer 3U8FHS7YZV4GCpbwyxNUybKaAQAQZAzFyXoqCFeGqYRk'
    },
    json: true
  }

  return rp(options)
    .then(results => {
      return results.fields
        .map(question => question.properties.choices
          .map(choice => choice.label))
    })
}
