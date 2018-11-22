module.exports = {
  environment: {
    development: process.env.NODE_ENV !== 'production' || false
  },
  typeform: {
    url: process.env.TYPEFORM_URL,
    formId: process.env.TYPEFORM_FORM_ID,
    authToken: process.env.TYPEFORM_AUTH_TOKEN
  }
}
