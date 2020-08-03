const config = require('../../config');
const api = require('./api');

const uploadToHubspot = async (pdf, uuid) => {
  const { email } = await api.getFormSubmission(uuid);
  const contactId = await api.getContactId(email);
  const uploadedReportId = await api.uploadFile(
    pdf,
    config.app.hubspot.reportsFolder
  );

  await api.createNote(contactId, [uploadedReportId]);
};

module.exports = uploadToHubspot;
