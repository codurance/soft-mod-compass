const uuidv4 = require('uuid/v4');
const uuid = uuidv4();
const surveyElement = document.getElementById('typeform-survey');

const hiddenFieldToPopulate = `uuid=${uuid}`;
const typeformId = surveyElement.dataset.typeformFormId;
const hubspotFromUrl = surveyElement.dataset.hubspotFormUrl;
const typeformSurveyUrlWithUuidAsHiddenField = `https://form.typeform.com/to/${typeformId}/?${hiddenFieldToPopulate}`;
const hubspotLandingPageWithUuidAsHiddenField = `${hubspotFromUrl}?${hiddenFieldToPopulate}`;

window.typeformEmbed.makeWidget(
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
