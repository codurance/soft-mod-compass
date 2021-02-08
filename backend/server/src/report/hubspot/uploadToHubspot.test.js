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
    jobFunction: 'CEO',
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
    const surveyScore = {
      organisationalMaturity: {
        score: 50,
      },
      continuousDelivery: {
        score: 50,
      },
      culture: {
        score: 25,
      },
      crossFunctionalTeams: {
        score: 50,
      },
      xpPractices: {
        score: 75,
      },
    };
    expect(await submitHubspotForm('pdf-link', fakeUser, surveyScore)).toEqual(
      fakeApiResponse
    );
    const scores = [
      {
        name: 'xp_practices_score',
        value: 75,
      },
      {
        name: 'team_effectiveness_score',
        value: 50,
      },
      {
        name: 'organisationalmaturity_score',
        value: 50,
      },
      {
        name: 'continuousdelivery_score',
        value: 50,
      },
      {
        name: 'culture_score',
        value: 25,
      },
    ];

    expect(apiMock.submitForm).toHaveBeenCalledWith(
      'pdf-link',
      fakeUser,
      scores
    );
  });
});
