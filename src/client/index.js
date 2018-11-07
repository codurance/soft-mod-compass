const generateUuid = require('uuid/v4')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
const surveyUrl = `https://danparkin.typeform.com/to/GCIHgH?uuid=${uuid}`

typeformEmbed.makeWidget(
  surveyElement,
  surveyUrl,
  {
    onSubmit: () => {
      window.location = `https://info.codurance.com/compass-test?uuid=${uuid}`
    }
  }
)
