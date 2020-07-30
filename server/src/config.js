const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false;
const isESVersion = () => process.env.COMPASS_LANGUAGE === 'ES';

module.exports = {
  language: process.env.COMPASS_LANGUAGE,
  isESVersion: isESVersion(),
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment,
  },
  typeform: {
    authToken: process.env.TYPEFORM_AUTH_TOKEN,
  },
  hubspot: {
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    thanksLandingPageUrl: process.env.HUBSPOT_THANKS_LANDING_PAGE_URL,
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
