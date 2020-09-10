const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false;
const isESVersion = () => process.env.COMPASS_LANGUAGE === 'ES';

module.exports = {
  language: process.env.COMPASS_LANGUAGE,
  isESVersion: isESVersion(),
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment,
  },
  typeform: {
    formId: process.env.TYPEFORM_FORM_ID,
    authToken: process.env.TYPEFORM_AUTH_TOKEN,
  },
  hubspot: {
    formId: process.env.HUBSPOT_FORM_ID,
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    thanksLandingPageUrl: process.env.HUBSPOT_THANKS_LANDING_PAGE_URL,
  },
  aws: {
    bucket: process.env.REPORT_BUCKET,
  },
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports',
    },
    retryUntilSuccessful: {
      maxRetries: 10,
      sleepBeforeRetryMs: 3000,
    },
  },
};
