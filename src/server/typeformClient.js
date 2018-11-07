const rp = require('request-promise')

const typeformUrl = 'https://danparkin.typeform.com'
const formId = 'GCIHgH'

module.exports = {
  surveyAnswersFor,
  getQuestionChoices
}

function surveyAnswersFor (uuid) {
  const options = {
    uri: `${typeformUrl}/forms/${formId}/responses?query=${uuid}`,
    headers: {
      Authorization: 'Bearer A4ertXpQ7ieS26cUM5H1odoeaBR8NTnMSGCkSDKPcsNZ'
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
      Authorization: 'Bearer A4ertXpQ7ieS26cUM5H1odoeaBR8NTnMSGCkSDKPcsNZ'
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
