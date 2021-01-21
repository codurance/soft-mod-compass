const apiMock = {
  getFormSubmission: jest.fn(),
  getContactId: jest.fn(),
  uploadFile: jest.fn(),
  createNote: jest.fn(),
  submitForm: jest.fn(),
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

const {
  uploadReportToHubspot,
  submitHubspotForm,
} = require('./uploadToHubspot');
const api = require('./api');
describe('Upload report to Hubspot', () => {
  const fakePdfBuffer = Buffer.from('pdf');

  const uploadedReportId = 'uploadedReportId_1234defabc';
  const fakeUser = {
    firstName: 'Alice',
    lastName: 'Cooper',
    company: 'Some Company',
    email: 'user@company.com',
  };
  const fakeApiResponse = { userCreated: 'user@company.com' };

  beforeEach(() => {
    jest.clearAllMocks();
    apiMock.uploadFile.mockReturnValue(uploadedReportId);
    apiMock.submitForm.mockReturnValue(fakeApiResponse);
  });

  it('uploads the pdf to the correct folder and with correct MIME type', async () => {
    const pdfLink = await uploadReportToHubspot(fakePdfBuffer, fakeUser);
    expect(pdfLink).toEqual(uploadedReportId);
    expect(api.uploadFile).toHaveBeenCalledWith(
      fakePdfBuffer,
      'compassReport_alice-cooper.pdf',
      'application/pdf',
      mockConfig.app.hubspot.reportsFolder
    );
  });

  it('should call hubspot form submission api', async () => {
    expect(await submitHubspotForm('pdf-link', fakeUser)).toEqual(
      fakeApiResponse
    );

    expect(apiMock.submitForm).toHaveBeenCalledWith('pdf-link', fakeUser);
  });
});
