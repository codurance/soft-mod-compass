const sharedConfig = require('./shared')

const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false

module.exports = {
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment
  },
  typeform: {
    ...sharedConfig.typeform,
    authToken: process.env.TYPEFORM_AUTH_TOKEN
  },
  hubspot: {
    ...sharedConfig.hubspot,
    thanksLandingPageUrl: process.env.HUBSPOT_THANKS_LANDING_PAGE_URL,
    authToken: process.env.HUBSPOT_AUTH_TOKEN
  },
  aws: {
    bucket: process.env.AWS_COMPASS_BUCKET
  }
}