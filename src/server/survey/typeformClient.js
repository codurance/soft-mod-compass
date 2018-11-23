const rp = require('request-promise')

module.exports = config => {
  const headers = {
    Authorization: `Bearer ${config.typeform.authToken}`
  }

  return {
    surveyAnswersFor,
    getQuestionChoices
  }

  function surveyAnswersFor (uuid) {
    const options = {
      uri: `${config.typeform.url}/forms/${config.typeform.formId}/responses?query=${uuid}`,
      headers,
      json: true
    }

    return rp(options)
      .then(results => results.items[0].answers.map(answer => answer.choice.label))
  }

  function getQuestionChoices () {
    const options = {
      uri: `${config.typeform.url}/forms/${config.typeform.formId}`,
      headers,
      json: true
    }

    return rp(options)
      .then(results => {
        return results.fields
          .map(question => question.properties.choices
            .map(choice => choice.label))
      })
  }
}
