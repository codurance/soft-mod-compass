/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const requestPromise = require('request-promise');
const TESTMAIL_ENDPOINT = `https://api.testmail.app/api/json?apikey=${process.env.TESTMAIL_APIKEY}&namespace=${process.env.TESTMAIL_NAMESPACE}`;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  function loadEnvvarsInConfig() {
    config.env.hubspotAuthToken = process.env.HUBSPOT_AUTH_TOKEN;
    config.env.langToTest = process.env.COMPASS_LANGUAGE;
  }
  function setBaseUrlBasedOnLanguage() {
    if (config.env.langToTest === 'EN') {
      config.baseUrl = 'https://compass-en.codurance.io';
    } else if (config.env.langToTest === 'ES') {
      config.baseUrl = 'https://compass-es.codurance.io';
    }
  }

  on('task', {
    async queryTestmail() {
      const result = await requestPromise(TESTMAIL_ENDPOINT);
      return result;
    },
  });

  loadEnvvarsInConfig();
  setBaseUrlBasedOnLanguage();
  return config;
};
