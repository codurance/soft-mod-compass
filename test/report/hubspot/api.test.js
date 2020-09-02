const nock = require('nock');

jest.doMock('../../../src/server/network/retryUntilSuccessful', () =>
  require('../../network/retryUntilSuccessfulMock')
);

const testAuthToken = 'MOCK_AUTH_TOKEN';
const mockConfig = {
  hubspot: {
    formId: 'MOCK_FORM_ID',
    authToken: testAuthToken,
  },
};

jest.doMock('../../../src/server/config', () => mockConfig);

const api = require('../../../src/server/report/hubspot/api');
describe('Hubspot API', () => {
  const hubspotApiBaseUrl = 'https://api.hubapi.com';
  const authQueryString = { hapikey: mockConfig.hubspot.authToken };

  const MOCK_PAGE_URL = 'NOT_USED';
  const MOCK_TIMESTAMP = 1593969791429;
  const OK = 200;
  const NOT_FOUND = 404;
  const MOCK_UUID = 'aaaaaaaa-1111-4444-9999-bbbbbbbbbbbb';

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('getFormSubmission', () => {
    const queryFormSubmissions = `/form-integrations/v1/submissions/forms/${mockConfig.hubspot.formId}`;
    const validResponseFromHubspotWithUserDetails = {
      results: [
        {
          submittedAt: MOCK_TIMESTAMP,
          values: [
            { name: 'firstname', value: 'sarah' },
            { name: 'lastname', value: 'some long last name' },
            { name: 'company', value: 'codurance' },
            { name: 'job_function', value: 'head of heads' },
            { name: 'email', value: 'sarah.baker@notgmail.com' },
            { name: 'uuid', value: MOCK_UUID },
          ],
          pageUrl: MOCK_PAGE_URL,
        },
      ],
      paging: {
        next: {
          after: 'NOT_USED',
          link: 'NOT_USED',
        },
      },
    };
    const emptyResponse = {
      results: [],
      paging: {
        next: {
          after: 'NOT_USED',
          link: 'NOT_USED',
        },
      },
    };

    it('returns form submission for UUID', async () => {
      // Given: Hubspot returns a valid response
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .query(authQueryString)
        .reply(OK, validResponseFromHubspotWithUserDetails);

      // When: Getting form submission
      const result = await api.getFormSubmission(MOCK_UUID);

      // Then: Values for UUID have been extracted
      expect(result).toEqual({
        firstName: 'sarah',
        lastName: 'some long last name',
        company: 'codurance',
        email: 'sarah.baker@notgmail.com',
        uuid: MOCK_UUID,
      });
    });

    it('retries mulitple times if form submission not found for UUID', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .query(authQueryString)
        .reply(OK, emptyResponse)

        .get(queryFormSubmissions)
        .query(authQueryString)
        .reply(OK, emptyResponse)

        .get(queryFormSubmissions)
        .query(authQueryString)
        .reply(OK, validResponseFromHubspotWithUserDetails);

      const result = await api.getFormSubmission(MOCK_UUID);

      expect(result).toHaveProperty('firstName', 'sarah');
    });
  });

  describe('getContactId', () => {
    const email = 'some.person@codurance.com';
    const contactId = 123456;

    const queryContactId = `/contacts/v1/contact/email/${email}/profile`;
    const validResponseFromHubspotWithContactId = {
      'canonical-vid': contactId,
    };
    const errorResponseContactDoesNotExist = {
      category: 'OBJECT_NOT_FOUND',
      correlationId: 'c16cfa36-db3a-4ecd-95c7-fcc5bcd6cebd',
      errors: [
        {
          message: 'The contact notacontact@codurance.com does not exist.',
        },
      ],
      message: 'contact does not exist',
      status: 'error',
    };

    it('returns the user ID for email', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryContactId)
        .query(authQueryString)
        .reply(OK, validResponseFromHubspotWithContactId);

      const result = await api.getContactId(email);

      expect(result).toBe(contactId);
    });

    it('throws error if user not found', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryContactId)
        .query(authQueryString)
        .reply(NOT_FOUND, errorResponseContactDoesNotExist);

      await expect(api.getContactId(email)).rejects.toThrowError(
        `Could not find ID of contact with email '${email}'`
      );
    });
  });

  describe('uploadFile', () => {
    const uploadedFileId = 'abcde1234';
    const fileBuffer = Buffer.from('my file');
    const fileName = 'hello.pdf';
    const fileMimeType = 'application/pdf';
    const pathOnHubspotFilemanager = 'Some/Nested Path';

    const uploadFileApiPath = '/filemanager/api/v2/files';
    const validResponseWithUploadedFileId = {
      objects: [{ id: uploadedFileId }],
    };

    it('returns ID of uploaded file', async () => {
      nock(hubspotApiBaseUrl)
        .post(uploadFileApiPath)
        .query(authQueryString)
        .reply(200, validResponseWithUploadedFileId);

      const result = await api.uploadFile(
        fileBuffer,
        fileName,
        fileMimeType,
        pathOnHubspotFilemanager
      );

      expect(result).toBe(uploadedFileId);
    });

    it('uploads the file with correct parameters', async () => {
      let requestBody;
      nock(hubspotApiBaseUrl)
        .post(uploadFileApiPath)
        .query(authQueryString)
        .reply(200, (_uri, body) => {
          requestBody = body;
          return validResponseWithUploadedFileId;
        });

      await api.uploadFile(
        fileBuffer,
        fileName,
        fileMimeType,
        pathOnHubspotFilemanager
      );

      // Note: This is not ideal, but I couldn't find a cleaner way to test.
      //       Feel free to improve :)

      // Ensure 'files' parameter is present
      expect(requestBody).toContain('name="files"');

      // Ensure 'folder_path' parameter is present
      expect(requestBody).toContain('name="folder_path"');
      // Ensure the correct folder is used
      expect(requestBody).toContain(pathOnHubspotFilemanager);

      // Ensure the file is uploaded correctly
      expect(requestBody).toContain(fileBuffer.toString());
      expect(requestBody).toContain(`filename="${fileName}"`);
      expect(requestBody).toContain(`Content-Type: ${fileMimeType}`);
    });

    it('throws error if upload failed', async () => {
      nock(hubspotApiBaseUrl)
        .post('/filemanager/api/v2/files')
        .query(authQueryString)
        .reply(400, 'some error');

      await expect(
        api.uploadFile(
          fileBuffer,
          fileName,
          fileMimeType,
          pathOnHubspotFilemanager
        )
      ).rejects.toThrowError('Could not upload file');
    });
  });

  describe('createNote', () => {
    const contactId = 1234;
    const attachmentId = 5678;
    const timestamp = Date.parse('03 Aug 2020 00:12:00 GMT');

    const engagementId = 9999;
    const createEngagementApiPath = '/engagements/v1/engagements';
    const validResponseWithEngagementId = { engagement: { id: engagementId } };

    const mockTimestamp = 1234;
    let originalDateNow;

    beforeAll(() => {
      originalDateNow = Date.now;
      Date.now = () => mockTimestamp;
    });
    afterAll(() => {
      Date.now = originalDateNow;
    });

    it("creates a 'NOTE' engagement with the correct parameters", async () => {
      let requestBody;
      nock(hubspotApiBaseUrl)
        .post(createEngagementApiPath)
        .query(authQueryString)
        .reply(200, (_uri, body) => {
          requestBody = body;
          return validResponseWithEngagementId;
        });

      await api.createNote(contactId, [attachmentId], timestamp);

      expect(requestBody).toEqual({
        engagement: {
          active: true,
          ownerId: null,
          type: 'NOTE',
          timestamp: timestamp,
        },
        associations: {
          contactIds: [contactId],
          companyIds: [],
          dealIds: [],
          ownerIds: [],
          ticketIds: [],
        },
        attachments: [{ id: attachmentId }],
        metadata: { body: '<b>Compass Report - Automatic Upload</b>' },
      });
    });

    it("uses 'Date.now()' if no timestamp is provided", async () => {
      let requestBody;
      nock(hubspotApiBaseUrl)
        .post(createEngagementApiPath)
        .query(authQueryString)
        .reply(200, (_uri, body) => {
          requestBody = body;
          return validResponseWithEngagementId;
        });

      await api.createNote(contactId, [attachmentId]);

      expect(requestBody.engagement.timestamp).toEqual(mockTimestamp);
    });

    it('Returns the ID of the created engagement', async () => {
      nock(hubspotApiBaseUrl)
        .post(createEngagementApiPath)
        .query(authQueryString)
        .reply(200, validResponseWithEngagementId);

      const response = await api.createNote(
        contactId,
        [attachmentId],
        timestamp
      );

      expect(response).toBe(engagementId);
    });

    it('throws error if engagement creation failed', async () => {
      nock(hubspotApiBaseUrl)
        .post(createEngagementApiPath)
        .query(authQueryString)
        .reply(400, 'some error');

      await expect(
        api.createNote(contactId, [attachmentId], timestamp)
      ).rejects.toThrowError('Could not create Note');
    });
  });
});
