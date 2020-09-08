const apiMock = {
  getFormSubmission: jest.fn(),
  getContactId: jest.fn(),
  uploadFile: jest.fn(),
  createNote: jest.fn(),
};
jest.doMock('./api', () => apiMock);

const mockConfig = {
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports Folder Path',
    },
  },
};
jest.doMock('../../config', () => mockConfig);

const uploadToHubspot = require('./uploadToHubspot');
const api = require('./api');
describe('Upload report to Hubspot', () => {
  const fakePdfBuffer = Buffer.from('pdf');
  const uuid = 'uuid-aaa-bbb-ccc-ddd';

  const email = 'person@email.com';
  const firstName = 'firstName';
  const lastName = 'lastName';
  const contactId = 'contactId_abcdef1234';
  const uploadedReportId = 'uploadedReportId_1234defabc';

  beforeEach(() => {
    jest.clearAllMocks();
    apiMock.getFormSubmission.mockReturnValue({ email, firstName, lastName });
    apiMock.getContactId.mockReturnValue(contactId);
    apiMock.uploadFile.mockReturnValue(uploadedReportId);
  });

  it('gets email from the form submission', async () => {
    await uploadToHubspot(fakePdfBuffer, uuid);
    expect(apiMock.getFormSubmission).toHaveBeenCalledWith(uuid);
  });

  it('get contact id from email', async () => {
    await uploadToHubspot(fakePdfBuffer, uuid);
    expect(api.getContactId).toHaveBeenCalledWith(email);
  });

  describe('upload the pdf to hubspot', () => {
    it('uploads the pdf to the correct folder and with correct MIME type', async () => {
      await uploadToHubspot(fakePdfBuffer, uuid);
      expect(api.uploadFile).toHaveBeenCalledWith(
        fakePdfBuffer,
        expect.any(String),
        'application/pdf',
        mockConfig.app.hubspot.reportsFolder
      );
    });

    describe('construct filename with user data', () => {
      test('valid first and last names', async () => {
        await uploadToHubspot(fakePdfBuffer, uuid);
        const uploadedPdfFilename = api.uploadFile.mock.calls[0][1];
        expect(uploadedPdfFilename).toBe(
          'compassReport_firstName-lastName.pdf'
        );
      });

      test('spaces are removed', async () => {
        apiMock.getFormSubmission.mockReturnValue({
          email,
          firstName: '   firstName ',
          lastName: ' lastName    ',
        });
        await uploadToHubspot(fakePdfBuffer, uuid);
        const uploadedPdfFilename = api.uploadFile.mock.calls[0][1];
        expect(uploadedPdfFilename).toBe(
          'compassReport_firstName-lastName.pdf'
        );
      });

      test('name is transformed to camelCase', async () => {
        apiMock.getFormSubmission.mockReturnValue({
          email,
          firstName: 'first name',
          lastName: 'last name',
        });
        await uploadToHubspot(fakePdfBuffer, uuid);
        const uploadedPdfFilename = api.uploadFile.mock.calls[0][1];
        expect(uploadedPdfFilename).toBe(
          'compassReport_firstName-lastName.pdf'
        );
      });

      test('special chars are removed', async () => {
        apiMock.getFormSubmission.mockReturnValue({
          email,
          firstName: 'firstNa%me $',
          lastName: '/ la9stName 11',
        });
        await uploadToHubspot(fakePdfBuffer, uuid);
        const uploadedPdfFilename = api.uploadFile.mock.calls[0][1];
        expect(uploadedPdfFilename).toBe(
          'compassReport_firstName-lastName.pdf'
        );
      });
    });
  });

  it('creates an note for the contact id', async () => {
    await uploadToHubspot(fakePdfBuffer, uuid);
    expect(api.createNote).toHaveBeenCalledWith(contactId, [uploadedReportId]);
  });
});
