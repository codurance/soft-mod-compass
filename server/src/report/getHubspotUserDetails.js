const requestPromise = require('request-promise');
const sleep = require('sleep-promise');
const config = require('../config');

const fieldsToTransformToTitleCase = [
  'firstname',
  'lastname',
  'company',
  'job_function',
];

async function getHubspotUserDetails(uuid, retries = 3) {
  if (typeof uuid !== 'string') console.error('uuid is not a string');

  function formattedDataForUuid(response) {
    function valueWithName(values, name) {
      for (const valueEntry of values) {
        if (valueEntry.name === name) return valueEntry.value;
      }
      throw `Could not find value with name ${name} in ${values}`;
    }
    const resultWithCorrectUuid = (result) =>
      valueWithName(result.values, 'uuid') === uuid;
    function convertValueToTitleCaseIfNeeded(entry) {
      function titleCase(str) {
        const names = str.toLowerCase().split(' ');
        for (let i = 0; i < names.length; i++) {
          names[i] = names[i][0].toUpperCase() + names[i].slice(1);
        }
        return names.join(' ');
      }
      if (fieldsToTransformToTitleCase.includes(entry.name)) {
        entry.value = titleCase(entry.value);
        return entry;
      } else {
        return entry;
      }
    }

    const dataForUuid = response.results.find(resultWithCorrectUuid);
    dataForUuid.values = dataForUuid.values.map(
      convertValueToTitleCaseIfNeeded
    );
    return dataForUuid;
  }
  async function sleepAndRetryLater() {
    const retriesLeft = retries - 1;
    if (retriesLeft === 0)
      throw Error(`Hubspot User Details could not be retrieved for ${uuid}`);

    await sleep(config.app.hubspot.sleepBeforeRetryMs);
    return getHubspotUserDetails(uuid, retriesLeft);
  }

  const response = await requestPromise({
    uri: `https://api.hubapi.com/form-integrations/v1/submissions/forms/${config.hubspot.formId}`,
    qs: {
      hapikey: config.hubspot.authToken,
    },
    json: true,
  });

  if (response.results.length === 0) {
    return sleepAndRetryLater();
  }

  return formattedDataForUuid(response);
}

module.exports = getHubspotUserDetails;
