const { renderPdf, initializeJsReportBackend } = require('../jsReportService');
const bodyRequest = require('../mockData/post_survey_request_body.json');

const generateReportMock = jest.fn();
jest.doMock('../jsReportService', () => {
  return {
    renderPdf: generateReportMock,
    initializeJsReportBackend: jest.fn(),
  };
});
const uploadReportToHubspotMock = {
  uploadReportToHubspot: jest.fn(),
  submitHubspotForm: jest.fn(),
};
jest.doMock(
  '../report/hubspot/uploadToHubspot',
  () => uploadReportToHubspotMock
);
const { submitSurvey } = require('./surveyOrchestrator');

describe('SurveyOrchestrator', () => {
  const pdfLinkMock = 'pdfLink';

  it('process the survey', async () => {
    generateReportMock.mockImplementation(() => ({ content: '' }));
    uploadReportToHubspotMock.uploadReportToHubspot.mockImplementation(
      () => pdfLinkMock
    );
    const expectedResult = {
      status: 'ok',
      pdfUrl: pdfLinkMock,
    };
    uploadReportToHubspotMock.submitHubspotForm.mockImplementation(() => {});

    const result = await submitSurvey(bodyRequest);

    expect(result).toEqual(expectedResult);
    expect(generateReportMock).toHaveBeenCalledTimes(1);
    expect(
      uploadReportToHubspotMock.uploadReportToHubspot
    ).toHaveBeenCalledTimes(1);
    expect(uploadReportToHubspotMock.submitHubspotForm).toHaveBeenCalledTimes(
      1
    );
  });
});
