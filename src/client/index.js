const generateUuid = require('uuid/v4')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
/*
Hidden fields are pre-populated using query string parameters in both Typeform and Hubspot

Sources
Typeform: https://developer.typeform.com/embed/hidden-fields/
Hubspot: https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string
*/
const hiddenFieldToAutoPopulate = `uuid=${uuid}`
const surveyUrl = `https://mashooqbadar.typeform.com/to/yiRLeY?${hiddenFieldToAutoPopulate}`
const hubspotLandingPage = `https://info.codurance.com/en/compass-details-submission?${hiddenFieldToAutoPopulate}`

typeformEmbed.makeWidget(
  surveyElement,
  surveyUrl,
  {
    onSubmit: () => {
      setTimeout(() => {
        window.location = hubspotLandingPage
      }, 2500);
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
