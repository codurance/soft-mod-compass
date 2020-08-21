const requestPromise = require('request-promise');
const sleep = require('sleep-promise');
const config = require('../config');

const fieldsToTransformToTitleCase = [
  'firstname',
  'lastname',
  'company',
  'job_function',
];

function valueWithName(values, name) {
  for (const valueEntry of values) {
    if (valueEntry.name === name) return valueEntry.value;
  }
  throw `Could not find value with name ${name} in ${values}`;
}

async function getHubspotUserDetails(uuid, retries = 3) {
  if (typeof uuid !== 'string') console.error('uuid is not a string');
  const resultWithCorrectUuid = (result) =>
    valueWithName(result.values, 'uuid') === uuid;

  const response = await requestPromise({
    uri: `https://api.hubapi.com/form-integrations/v1/submissions/forms/${config.hubspot.formId}`,
    qs: {
      hapikey: config.hubspot.authToken,
    },
    json: true,
  });

  if (
    !(response.results.length === 0) &&
    response.results.find(resultWithCorrectUuid) !== undefined
  ) {
    const dataForUuid = response.results.find(resultWithCorrectUuid);
    return dataForUuid;
  } else {
    const retriesLeft = retries - 1;
    if (retriesLeft === 0)
      throw Error(`Hubspot User Details could not be retrieved for ${uuid}`);

    await sleep(config.app.hubspot.sleepBeforeRetryMs);
    return getHubspotUserDetails(uuid, retriesLeft);
  }
}

module.exports = getHubspotUserDetails;
