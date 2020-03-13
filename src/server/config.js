const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false

module.exports = {
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment
  },
  typeform: {
    url: process.env.TYPEFORM_URL,
    formId: process.env.TYPEFORM_FORM_ID,
    authToken: process.env.TYPEFORM_AUTH_TOKEN
  },
  hubspot: {
    formId: process.env.HUBSPOT_FORM_ID,
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    thanksLandingPageUrl: process.env.HUBSPOT_THANKS_LANDING_PAGE_URL
  }
}
