const rp = require('request-promise')

const typeformUrl = 'https://danparkin.typeform.com'
const formId = 'Lks1RA'

module.exports = {
  surveyAnswersFor
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
    .then(results => {
      return results.items[0].answers[0].choice.label
    })
}
