const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false;

module.exports = {
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment,
  },
  hubspot: {
    formId: process.env.HUBSPOT_FORM_ID,
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    portalId: process.env.HUBSPOT_ACCOUNT_ID,
  },
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports',
    },
  },
};
