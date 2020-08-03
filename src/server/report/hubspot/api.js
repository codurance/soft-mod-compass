const config = require('../../config');
const request = require('request-promise');
const retryUntilSuccessful = require('../../network/retryUntilSuccessful');

const hubspotRequest = async (path) => {
  return request({
    uri: `https://api.hubapi.com` + path,
    qs: { hapikey: config.hubspot.authToken },
    json: true,
  });
};

const getFormSubmission = async (uuid) => {
  const valueWithName = (values, name) => {
    for (const valueEntry of values) {
      if (valueEntry.name === name) return valueEntry.value;
    }
    throw `Could not find value with name '${name}' in '${values
      .map(({ name, _value }) => name)
      .join(', ')}'`;
  };
  const findSubmissionForUuid = (response) => {
    const resultWithCorrectUuid = (result) =>
      valueWithName(result.values, 'uuid') === uuid;
    return response.results.find(resultWithCorrectUuid);
  };
  const extractValues = (submission) => submission.values;

  const valuesForUuid = await retryUntilSuccessful(
    () =>
      hubspotRequest(
        `/form-integrations/v1/submissions/forms/${config.hubspot.formId}`
      ),
    (response) => 'results' in response && response.results.length !== 0
  )
    .then(findSubmissionForUuid)
    .then(extractValues);

  return {
    firstName: valueWithName(valuesForUuid, 'firstname'),
    lastName: valueWithName(valuesForUuid, 'lastname'),
    company: valueWithName(valuesForUuid, 'company'),
    jobFunction: valueWithName(valuesForUuid, 'job_function'),
    email: valueWithName(valuesForUuid, 'email'),
    uuid,
  };
};

const getContactId = (email) => {};
const uploadFile = (file, pathOnHubspotFilemanager) => {};
const createNote = (
  contactId,
  attachmentsIds,
  ownerId,
  timestamp = Date.now()
) => {};
module.exports = {
  getFormSubmission,
  getContactId,
  uploadFile,
  createNote,
};
