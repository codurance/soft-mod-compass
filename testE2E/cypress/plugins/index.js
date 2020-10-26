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

const { fromPath } = require('pdf2pic');
const requestPromise = require('request-promise');
const resemble = require('resemblejs');
const path = require('path');
const pdfPath = path.join(__dirname, '../support/compass-report.pdf');
const saveFilePath = path.join(__dirname, '../support/images');
const image1 = path.join(__dirname, '../support/images/compass.png');
const image2 = path.join(__dirname, '../support/images/expected.png');
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
      const response = await requestPromise(TESTMAIL_ENDPOINT);
      const parsedResponse = JSON.parse(response);

      const reportLink = parsedResponse.emails[0].text.match(
        'https:\\/\\/compass-dev-en\\.s3\\.eu-west-1\\.amazonaws\\.com\\/compass-report-[a-zA-Z0-9-]+.pdf'
      )[0];

      return response;
    },

    async convertPDFToPng() {
      const pageToConvertAsImage = 10;
      const options = {
        density: 100,
        saveFilename: `compassReport_${pageToConvertAsImage}`,
        savePath: saveFilePath,
        format: 'png',
        width: 1240,
        height: 1754,
      };

      const storeAsImage = fromPath(pdfPath, options);

      await storeAsImage(pageToConvertAsImage);
      console.log(`Page ${pageToConvertAsImage} is now converted as image`);

      return image1;
    },

    async compareImage(actualImage) {
      var imageComparisonResult;
      console.log('------------Starting comparison---------------');
      resemble(actualImage)
        .compareTo(image2)
        .ignoreAntialiasing()
        .onComplete((result) => {
          imageComparisonResult = result;
        });
      console.log('------------Comparison done---------------------');
      return imageComparisonResult;
    },
  });

  loadEnvvarsInConfig();
  setBaseUrlBasedOnLanguage();
  return config;
};
