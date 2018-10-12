const generateUuid = require('uuid/v4')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
const surveyUrl = `https://danparkin.typeform.com/to/Lks1RA?uuid=${uuid}`

typeformEmbed.makeWidget(
  surveyElement,
  surveyUrl,
  {
    onSubmit: () => {
      window.location = `/results?id=${uuid}`
    }
  }
)
