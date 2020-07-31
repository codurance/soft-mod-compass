const apiMock = {
  getFormSubmission: jest.fn(),
  getUserId: jest.fn(),
  uploadFile: jest.fn(),
  createEngagement: jest.fn(),
};
jest.doMock('../../../src/server/report/hubspot/api.js', () => apiMock);

const uploadToHubspot = require('../../../src/server/report/hubspot/uploadToHubspot');
describe('Upload report to Hubspot', () => {
  it('gets email from the form submission', () => {
    const fakePdf = 'pdf';
    const uuid = 'aaa-bbb-ccc-ddd';

    uploadToHubspot(fakePdf, uuid);

    expect(apiMock.getFormSubmission).toHaveBeenCalledWith(uuid);
  });
});
