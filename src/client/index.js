const getReportUrl = require('./getReportUrl')
const generateUuid = require('uuid/v4')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
const surveyUrl = `https://mashooqbadar.typeform.com/to/yiRLeY?uuid=${uuid}`

typeformEmbed.makeWidget(
  surveyElement,
  surveyUrl,
  {
    onSubmit: () => {
      window.location = `/scores/${uuid}`
    }
  }
)

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
