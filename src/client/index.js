const generateUuid = require('uuid/v4')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
const surveyUrl = `https://mashooqbadar.typeform.com/to/yiRLeY?uuid=${uuid}`

typeformEmbed.makeWidget(
  surveyElement,
  surveyUrl,
  {
    onSubmit: () => {
      const Http = new XMLHttpRequest()
      const url = `/scores/${uuid}`
      Http.open('GET', url)
      Http.send()
      Http.onreadystatechange = (e) => {
        const scores = Http.responseText
        window.location = `https://info.codurance.com/compass-test?uuid=${uuid}&scores=${scores}`
      }
    }
  }
)

function checkSurveyHasFocus() {
  const surveyIframe = document.getElementsByTagName("iframe")[0]
  const iframeDoesNotHaveFocus = document.activeElement === surveyIframe
  if(iframeDoesNotHaveFocus) {
    clearInterval(checkSurveyHasFocusInterval)
  } else {
    surveyIframe.focus()
  }
}

const checkSurveyHasFocusInterval = window.setInterval(checkSurveyHasFocus, 100)
