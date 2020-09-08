const getFormSubmission = (uuid) => {};

const getContactId = (email) => {};

const uploadFile = (
  fileBufer,
  fileName,
  fileMimeType,
  pathOnHubspotFilemanager
) => {};

const createNote = (contactId, attachmentsIds, timestamp = Date.now()) => {};

module.exports = {
  getFormSubmission,
  getContactId,
  uploadFile,
  createNote,
};
