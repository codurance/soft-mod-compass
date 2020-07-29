const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false;
const isESVersion = () => process.env.COMPASS_LANGUAGE === 'ES';
const canonicalUrlTld = isESVersion() ? 'es' : 'com';

module.exports = {
  language: process.env.COMPASS_LANGUAGE,
  isESVersion: isESVersion(),
  canonicalUrl: `https://compass.codurance.${canonicalUrlTld}`,
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment,
  },
  typeform: {
    url: process.env.TYPEFORM_URL,
    formId: process.env.TYPEFORM_FORM_ID,
    authToken: process.env.TYPEFORM_AUTH_TOKEN,
  },
  hubspot: {
    formId: process.env.HUBSPOT_FORM_ID,
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    thanksLandingPageUrl: process.env.HUBSPOT_THANKS_LANDING_PAGE_URL,
    formLandingPageUrl: process.env.HUBSPOT_FORM_LANDING_PAGE_URL,
  },
  aws: {
    bucket: process.env.AWS_COMPASS_BUCKET,
  },
  app: {
    typeform: {
      sleepBeforeRetryMs: 3000,
    },
    hubspot: {
      sleepBeforeRetryMs: 2000,
    },
  },
};
