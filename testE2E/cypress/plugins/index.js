const TESTMAIL_APIKEY = '43c44a6d-bbf9-4a67-a2c6-ca3dd76d9bf4';
const TESTMAIL_NAMESPACE = '91tdt';

const request = require('request');
const requestPromise = require('request-promise');

const TESTMAIL_ENDPOINT = (tag) =>
  `https://api.testmail.app/api/json?apikey=${TESTMAIL_APIKEY}&namespace=${TESTMAIL_NAMESPACE}&tag=${tag}&livequery=true`;

function requestPdfBody(pdfOptions) {
  // using request because of issue with requesting files : https://github.com/request/request-promise/issues/171
  return new Promise((resolve) => {
    request.get(pdfOptions, (err, res, body) => resolve(body));
  });
}

module.exports = (on, config) => {
  function setBaseUrlBasedOnLanguage() {
    config.baseUrl = 'http://compass.dev.codurance.io';
  }

  on('task', {
    async queryTestmail(tag) {
      console.log(`sending testmail query... tag : ${tag}`);
      var options = {
        uri: TESTMAIL_ENDPOINT(tag),
        simple: false,
      };
      let requestSucceeded = false;
      setTimeout(() => {
        if (!requestSucceeded) throw new Error('query email timed out');
      }, 120000);
      const response = await requestPromise(options);
      requestSucceeded = true;
      const parsedResponse = JSON.parse(response);
      console.log(parsedResponse.emails[0].text);
      return {
        reportLink: parsedResponse.emails[0].text.match(
          '(https:\\/\\/email\\.codurance\\.com\\/e3t\\/Ctc.+)\\\n'
        )[0],
        subject: parsedResponse.emails[0].subject,
      };
    },

    async assertOnPdfLink(reportLink) {
      console.log('link ', reportLink);

      const reportLinkOptions = {
        url: reportLink,
        encoding: null,
      };

      const pdfBuffer = Buffer.from(
        await requestPdfBody(reportLinkOptions),
        'utf8'
      );
      return pdfBuffer;
    },
  });

  setBaseUrlBasedOnLanguage();
  return config;
};
