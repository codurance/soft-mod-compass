const environmentIsDevelopment = process.env.NODE_ENV !== 'production' || false;

module.exports = {
  jsreport: {
    studioEditorEnabled: environmentIsDevelopment,
  },
  hubspot: {
    formId: process.env.HUBSPOT_FORM_ID,
    authToken: process.env.HUBSPOT_AUTH_TOKEN,
    portalId: process.env.HUBSPOT_ACCOUNT_ID,
    formApiUrl: 'https://api.hsforms.com',
    fileApiUrl: 'https://api.hubapi.com',
  },
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports',
    },
  },
  cors: {
    allowedOrigin: process.env.ALLOWED_ORIGIN,
  },
};
