const requestPromise = require('request-promise');
const config = require('../config');
const retryUntilSuccessful = require('../network/retryUntilSuccessful');

const fieldsToTransformToTitleCase = [
  'firstname',
  'lastname',
  'company',
  'job_function',
];

const getFormSubmissions = async (formId) =>
  requestPromise({
    uri: `https://api.hubapi.com/form-integrations/v1/submissions/forms/${formId}`,
    qs: {
      hapikey: config.hubspot.authToken,
    },
    json: true,
  });

function valueWithName(values, name) {
  for (const valueEntry of values) {
    if (valueEntry.name === name) return valueEntry.value;
  }
  throw `Could not find value with name ${name} in ${values}`;
}

async function getHubspotUserDetails(uuid) {
  if (typeof uuid !== 'string') console.error('uuid is not a string');

  function convertValuesToTitleCaseIfNeeded(dataForUuid) {
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

    dataForUuid.values = dataForUuid.values.map(
      convertValueToTitleCaseIfNeeded
    );
    return dataForUuid;
  }

  const extractResultsForUuid = (response) => {
    const resultWithCorrectUuid = (result) =>
      valueWithName(result.values, 'uuid') === uuid;
    return response.results.find(resultWithCorrectUuid);
  };

  return retryUntilSuccessful(
    () => getFormSubmissions(config.hubspot.formId),
    (resp) => resp.results.length !== 0
  )
    .then(extractResultsForUuid)
    .then(convertValuesToTitleCaseIfNeeded);
}

module.exports = getHubspotUserDetails;
