const generateUuid = require('uuid/v4');
const typeformEmbed = require('@typeform/embed');

function typeformFactory() {
  const initializeTypeformSurvey = () => {
    /*
    Hidden fields are pre-populated using query string parameters in both Typeform and Hubspot
    
    Sources
    Typeform: https://developer.typeform.com/embed/hidden-fields/
    Hubspot: https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string
    */
    const uuid = generateUuid();
    const surveyElement = document.getElementById('typeform-survey');
    const hiddenFieldToAutoPopulate = `uuid=${uuid}`;
    const typeformId = surveyElement.dataset.typeformFormId;
    const hubspotFromUrl = surveyElement.dataset.hubspotFormUrl;
    const typeformSurveyUrlWithUuidAsHiddenField = `https://form.typeform.com/to/${typeformId}/?${hiddenFieldToAutoPopulate}`;
    const hubspotLandingPageWithUuidAsHiddenField = `${hubspotFromUrl}?${hiddenFieldToAutoPopulate}`;

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
  };

  const ensureSurveyAlwaysHasFocus = () => {
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
  };

  return { initializeTypeformSurvey, ensureSurveyAlwaysHasFocus };
}
module.exports = typeformFactory;
