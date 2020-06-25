const generateUuid = require('uuid/v4');
const typeformEmbed = require('@typeform/embed');
const cookieMessageFactory = require('./cookieMessage');
const hubspotEmbeddedFactory = require('./hubspotEmbedded');

/*
Hidden fields are pre-populated using query string parameters in both Typeform and Hubspot

Sources
Typeform: https://developer.typeform.com/embed/hidden-fields/
Hubspot: https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string
*/
const uuid = generateUuid();
const surveyElement = document.getElementById('typeform-survey');
const hiddenFieldToAutoPopulate = `uuid=${uuid}`;
const typeformSurveyUrlWithUuidAsHiddenField = `${surveyElement.dataset.typeformurl}/to/${surveyElement.dataset.typeformformid}?${hiddenFieldToAutoPopulate}`;
const hubspotLandingPageWithUuidAsHiddenField = `${surveyElement.dataset.hubspotformlandingpageurl}?${hiddenFieldToAutoPopulate}`;

typeformEmbed.makeWidget(
  surveyElement,
  typeformSurveyUrlWithUuidAsHiddenField,
  {
    onSubmit: () => {
      setTimeout(() => {
        window.location = hubspotLandingPageWithUuidAsHiddenField;
      }, 2500);
    },
  }
);

function checkSurveyHasFocus() {
  const surveyIframe = document.getElementsByTagName('iframe')[0];
  const iframeHasFocus = document.activeElement === surveyIframe;
  if (iframeHasFocus) {
    clearInterval(checkSurveyHasFocusInterval);
  } else {
    surveyIframe.focus();
  }
}

const checkSurveyHasFocusInterval = window.setInterval(
  checkSurveyHasFocus,
  100
);

window.ready = ready;

function ready(func) {
  if (document.readyState === 'complete' || document.readyState != 'loading') {
    func();
  } else {
    document.addEventListener('DOMContentLoaded', func);
  }
}

window.compass = window.compass || {};
ready(function () {
  const cookieMessage = cookieMessageFactory();
  window.compass.cookieMessage = cookieMessage;

  hubspotEmbedded = hubspotEmbeddedFactory(cookieMessage);
  hubspotEmbedded.initializeHubspot();
});
