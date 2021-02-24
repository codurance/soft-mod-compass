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

    const uploadFileApiPath = '/filemanager/api/v3/files/upload';

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
        jobFunction: 'CEO',
        ip: 'mockedIp',
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
              {
                name: 'job_function',
                value: 'CEO',
              },
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
                value: 75,
              },
              {
                name: 'continuousdelivery_score',
                value: 50,
              },
              {
                name: 'culture_score',
                value: 25,
              },
            ],
            legalConsentOptions: {
              legitimateInterest: {
                value: true,
                subscriptionTypeId: 4603721,
                legalBasis: 'CUSTOMER',
                text:
                  'Codurance needs the contact information you provide to us to contact you about our products and services. As responsible for the treatment, Codurance has the necessary technical, organizational and human resources to guarantee the security and protection of its information systems, as well as the data and information stored in them. Your personal data will be treated to comply with both the legal obligations that are applicable, as well as the rights and obligations contained in the contracts you may have with us as well as the services you require. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.',
              },
            },
            context: {
              ipAddress: 'mockedIp',
            },
          }
        )
        .reply(200);
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
          value: 75,
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
      const resp = await api.submitForm(uploadedFileUrl, fakeUser, scores);
      expect(mockedRequest.isDone()).toBe(true);
      expect(resp).toEqual({
        userCreated: fakeUser.email,
      });
    });
  });
});
