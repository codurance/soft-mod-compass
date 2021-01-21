const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false;
const isESVersion = () => process.env.COMPASS_LANGUAGE === 'ES';

module.exports = {
  isESVersion: isESVersion(),
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment,
  },
  hubspot: {
    formId: process.env.HUBSPOT_FORM_ID,
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    thanksLandingPageUrl: process.env.HUBSPOT_THANKS_LANDING_PAGE_URL,
    portalId: process.env.HUBSPOT_ACCOUNT_ID,
  },
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports',
    },
  },
};
