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
const request = require('request')
const { fromBuffer } = require('pdf2pic')
const requestPromise = require('request-promise')
const resemble = require('resemblejs')
const path = require('path')
const saveFilePath = path.join(__dirname, '../support/images')
const expectedImage = path.join(__dirname, '../support/images/expected.png')
const TESTMAIL_ENDPOINT = `https://api.testmail.app/api/json?apikey=${process.env.TESTMAIL_APIKEY}&namespace=${process.env.TESTMAIL_NAMESPACE}`

function requestPdfBody (pdfOptions) {
  return new Promise(resolve => {
      request.get(pdfOptions,
        (err, res, body) =>
          resolve(body)
      )
    }
  )
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  function loadEnvvarsInConfig () {
    config.env.hubspotAuthToken = process.env.HUBSPOT_AUTH_TOKEN
    config.env.langToTest = process.env.COMPASS_LANGUAGE
  }

  function setBaseUrlBasedOnLanguage () {
    if (config.env.langToTest === 'EN') {
      config.baseUrl = 'https://compass-en.codurance.io'
    } else if (config.env.langToTest === 'ES') {
      config.baseUrl = 'https://compass-es.codurance.io'
    }
  }

  on('task', {
    async queryTestmail () {
      const response = await requestPromise(TESTMAIL_ENDPOINT)
      const parsedResponse = JSON.parse(response)
      const reportLink = parsedResponse.emails[0].text.match(
        'https:\\/\\/compass-dev-en\\.s3\\.eu-west-1\\.amazonaws\\.com\\/compass-report-[a-zA-Z0-9-]+.pdf'
      )[0]

      return reportLink
    },

    async convertPDFToPng (reportLink) {
      console.log('link ', reportLink)
      const pageToConvertAsImage = 10
      const options = {
        density: 100,
        saveFilename: `compassReport_${pageToConvertAsImage}`,
        savePath: saveFilePath,
        format: 'png',
        width: 1240,
        height: 1754,
      }

      const reportLinkOptions = {
        url: reportLink,
        encoding: null
      }

      const pdfBuffer = Buffer.from(
        await requestPdfBody(reportLinkOptions),
        'utf8'
      )
      const storedImage = await fromBuffer(pdfBuffer, options)(pageToConvertAsImage)
      console.log(`stored image of PDF report page ${pageToConvertAsImage}`, storedImage)
      return storedImage.path
    },

    compareImage (actualImage) {
      var imageComparisonResult
      console.log('------------Starting comparison---------------')
      resemble(actualImage)
        .compareTo(expectedImage)
        .ignoreAntialiasing()
        .onComplete((result) => {
          imageComparisonResult = result
        })
      console.log('------------Comparison done---------------------')
      return imageComparisonResult
    },
  })

  loadEnvvarsInConfig()
  setBaseUrlBasedOnLanguage()
  return config
}
