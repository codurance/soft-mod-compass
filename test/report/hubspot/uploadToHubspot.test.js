const apiMock = {
  getFormSubmission: jest.fn(),
  getContactId: jest.fn(),
  uploadFile: jest.fn(),
  createNote: jest.fn(),
};
jest.doMock('../../../src/server/report/hubspot/api.js', () => apiMock);

const mockConfig = {
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports Folder Path',
    },
  },
};
jest.doMock('../../../src/server/config', () => mockConfig);

const uploadToHubspot = require('../../../src/server/report/hubspot/uploadToHubspot');
const api = require('../../../src/server/report/hubspot/api');
describe('Upload report to Hubspot', () => {
  const fakePdf = 'pdf';
  const uuid = 'uuid-aaa-bbb-ccc-ddd';

  const email = 'person@email.com';
  const contactId = 'contactId_abcdef1234';
  const uploadedReportId = 'uploadedReportId_1234defabc';

  beforeEach(() => {
    jest.clearAllMocks();
    apiMock.getFormSubmission.mockReturnValue({ email });
    apiMock.getContactId.mockReturnValue(contactId);
    apiMock.uploadFile.mockReturnValue(uploadedReportId);
  });

  it('gets email from the form submission', async () => {
    await uploadToHubspot(fakePdf, uuid);
    expect(apiMock.getFormSubmission).toHaveBeenCalledWith(uuid);
  });

  it('get contact id from email', async () => {
    await uploadToHubspot(fakePdf, uuid);
    expect(api.getContactId).toHaveBeenCalledWith(email);
  });

  it('uploads the pdf to Hubspot', async () => {
    await uploadToHubspot(fakePdf, uuid);
    expect(api.uploadFile).toHaveBeenCalledWith(
      fakePdf,
      mockConfig.app.hubspot.reportsFolder
    );
  });

  it('creates an note for the contact id', async () => {
    await uploadToHubspot(fakePdf, uuid);
    expect(api.createNote).toHaveBeenCalledWith(contactId, [uploadedReportId]);
  });
});
