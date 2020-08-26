const config = require('../../config');
const request = require('request-promise');
const retryUntilSuccessful = require('../../network/retryUntilSuccessful');

const hubspotPost = async (path, { formData, body }) => {
  const requestOptions = {
    method: 'POST',
    uri: 'https://api.hubapi.com' + path,
    qs: { hapikey: config.hubspot.authToken },
    json: true,
  };

  if (formData) requestOptions.formData = formData;
  if (body) requestOptions.body = body;

  return request(requestOptions);
};
const hubspotGet = async (path) => {
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
      hubspotGet(
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

const getContactId = (email) => {
  const extractVid = (resp) => resp['canonical-vid'];

  return hubspotGet(`/contacts/v1/contact/email/${email}/profile`)
    .then(extractVid)
    .catch((_) => {
      throw new Error(`Could not find ID of contact with email '${email}'`);
    });
};

const uploadFile = (
  fileBufer,
  fileName,
  fileMimeType,
  pathOnHubspotFilemanager
) => {
  const extractUploadedFileId = (resp) => resp['objects'][0]['id'];

  return hubspotPost(`/filemanager/api/v2/files`, {
    formData: {
      files: {
        value: fileBufer,
        options: {
          filename: fileName,
          contentType: fileMimeType,
        },
      },
      folder_path: pathOnHubspotFilemanager,
    },
  })
    .then(extractUploadedFileId)
    .catch((e) => {
      throw new Error(`Could not upload file - Reason: ${e.message}`);
    });
};
const createNote = (contactId, attachmentsIds, timestamp = Date.now()) => {
  const newNoteJson = (contactId, attachmentsIds, timestamp, body) => ({
    engagement: {
      active: true,
      ownerId: null,
      type: 'NOTE',
      timestamp: timestamp,
    },
    associations: {
      contactIds: [contactId],
      companyIds: [],
      dealIds: [],
      ownerIds: [],
      ticketIds: [],
    },
    attachments: attachmentsIds.map((id) => ({ id })),
    metadata: { body },
  });
  const body = '<b>Compass Report - Automatic Upload</b>';

  const extractEngagementId = (response) => response.engagement.id;

  return hubspotPost('/engagements/v1/engagements', {
    body: newNoteJson(contactId, attachmentsIds, timestamp, body),
  })
    .then(extractEngagementId)
    .catch((e) => {
      throw new Error(`Could not create Note - Reason: ${e.message}`);
    });
};

module.exports = {
  getFormSubmission,
  getContactId,
  uploadFile,
  createNote,
};
