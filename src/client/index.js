const generateUuid = require('uuid/v4')
const config = require('../config/shared')

const surveyElement = document.getElementById('typeform-survey')

const uuid = generateUuid()
/*
Hidden fields are pre-populated using query string parameters in both Typeform and Hubspot

Sources
Typeform: https://developer.typeform.com/embed/hidden-fields/
Hubspot: https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string
*/
const hiddenFieldToAutoPopulate = `uuid=${uuid}`
const typeformSurveyUrlWithUuidAsHiddenField = `${config.typeform.url}/to/${config.typeform.formId}?${hiddenFieldToAutoPopulate}`
const hubspotLandingPageWithUuidAsHiddenField = `${config.hubspot.formLandingPageUrl}?${hiddenFieldToAutoPopulate}`

typeformEmbed.makeWidget(
  surveyElement,
  typeformSurveyUrlWithUuidAsHiddenField,
  {
    onSubmit: () => {
      setTimeout(() => {
        window.location = hubspotLandingPageWithUuidAsHiddenField
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
