const generateUuid = require('uuid/v4')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
const surveyUrl = `https://mashooqbadar.typeform.com/to/yiRLeY?uuid=${uuid}`

typeformEmbed.makeWidget(
  surveyElement,
  surveyUrl,
  {
    onSubmit: () => {
      redirectToReport()
    }
  }
)

function redirectToReport () {
  const http = new XMLHttpRequest()
  const surveyScoresEndpoint = `/scores/${uuid}`
  http.open('GET', surveyScoresEndpoint)
  http.send()
  http.onreadystatechange = (e) => {
    const scores = http.responseText
    const reportLandingPageUrl = `https://info.codurance.com/compass-test?uuid=${uuid}&scores=${scores}`
    window.location = reportLandingPageUrl
  }
}

function checkSurveyHasFocus () {
  const surveyIframe = document.getElementsByTagName('iframe')[0]
  const iframeHasFocus = document.activeElement === surveyIframe
  if (iframeHasFocus) {
    clearInterval(checkSurveyHasFocusInterval)
  } else {
    surveyIframe.focus()
  }
}

const checkSurveyHasFocusInterval = window.setInterval(checkSurveyHasFocus, 100)
