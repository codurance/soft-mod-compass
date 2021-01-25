const nock = require('nock');
const HubspotFormApi = 'https://api.fakeform.com';
const hubspotApiBaseUrl = 'https://api.fakeapi.com';

const mockConfig = {
  hubspot: {
    formId: 'MOCK_FORM_ID',
    authToken: 'MOCK_AUTH_TOKEN',
    portalId: 1234,
    formApiUrl: HubspotFormApi,
    fileApiUrl: hubspotApiBaseUrl,
  },
};

jest.doMock('../../config', () => mockConfig);

const api = require('./api');

describe('Hubspot API', () => {
  const authQueryString = { hapikey: mockConfig.hubspot.authToken };

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('hubspot api', () => {
    const uploadedFileId = 'abcde1234';
    const fileBuffer = Buffer.from('my file');
    const fileName = 'hello.pdf';
    const fileMimeType = 'application/pdf';
    const pathOnHubspotFilemanager = 'Some/Nested Path';

    const uploadFileApiPath = '/filemanager/api/v2/files';

    const validResponseWithUploadedFileLink = {
      objects: [{ s3_url: uploadedFileId }],
    };

    it('returns link of uploaded file', async () => {
      nock(hubspotApiBaseUrl)
        .post(uploadFileApiPath)
        .query(authQueryString)
        .reply(200, validResponseWithUploadedFileLink);

      const result = await api.uploadFile(
        fileBuffer,
        fileName,
        fileMimeType,
        pathOnHubspotFilemanager
      );

      expect(result).toBe(uploadedFileId);
    });

    it('should interact with hubspot form submission api', async () => {
      const fakeUser = {
        firstName: 'Alice',
        lastName: 'Cooper',
        company: 'Some Company',
        email: 'user@company.com',
        language: 'en',
      };
      const uploadedFileUrl = 'fakePdfLink';
      const mockedRequest = nock(HubspotFormApi)
        .post(
          `/submissions/v3/integration/submit/${mockConfig.hubspot.portalId}/${mockConfig.hubspot.formId}`,
          {
            fields: [
              {
                name: 'email',
                value: fakeUser.email,
              },
              {
                name: 'firstname',
                value: fakeUser.firstName,
              },
              {
                name: 'lastname',
                value: fakeUser.lastName,
              },
              {
                name: 'company',
                value: fakeUser.company,
              },
              {
                name: 'compass_language',
                value: fakeUser.language,
              },
              {
                name: 'report',
                value: uploadedFileUrl,
              },
            ],
          }
        )
        .reply(200);
      const resp = await api.submitForm(uploadedFileUrl, fakeUser);
      expect(mockedRequest.isDone()).toBe(true);
      expect(resp).toEqual({
        userCreated: fakeUser.email,
      });
    });
  });
});
