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

  const MOCK_PAGE_URL = 'NOT_USED';
  const MOCK_TIMESTAMP = 1593969791429;
  const OK = 200;
  const NOT_FOUND = 404;
  const MOCK_UUID = 'aaaaaaaa-1111-4444-9999-bbbbbbbbbbbb';

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('getFormSubmission', () => {
    const queryFormSubmissions = `/form-integrations/v1/submissions/forms/${mockConfig.hubspot.formId}?hapikey=${mockConfig.hubspot.authToken}`;
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

    // Note: Use async/await
    it('returns form submission for UUID', async () => {
      // Given: Hubspot returns a valid response
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .reply(OK, validResponseFromHubspotWithUserDetails);

      // When: Getting form submission
      const result = await api.getFormSubmission(MOCK_UUID);

      // Then: Values for UUID have been extracted and values are using Title Case
      expect(result).toEqual({
        firstName: 'sarah',
        lastName: 'some long last name',
        company: 'codurance',
        jobFunction: 'head of heads',
        email: 'sarah.baker@notgmail.com',
        uuid: MOCK_UUID,
      });
    });

    it('retries mulitple times if form submission not found for UUID', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .reply(OK, emptyResponse)
        .get(queryFormSubmissions)
        .reply(OK, emptyResponse)
        .get(queryFormSubmissions)
        .reply(OK, validResponseFromHubspotWithUserDetails);

      const result = await api.getFormSubmission(MOCK_UUID);

      expect(result).toHaveProperty('firstName', 'sarah');
    });
  });

  describe('getContactId', () => {
    const email = 'some.person@codurance.com';
    const contactId = 123456;

    const queryContactId = `/contacts/v1/contact/email/${email}/profile?hapikey=${mockConfig.hubspot.authToken}`;
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
        .reply(OK, validResponseFromHubspotWithContactId);

      const result = await api.getContactId(email);

      expect(result).toBe(contactId);
    });

    it('throws error if user not found', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryContactId)
        .reply(NOT_FOUND, errorResponseContactDoesNotExist);

      await expect(api.getContactId(email)).rejects.toThrowError(
        `Could not find ID of contact with email '${email}'`
      );
    });
  });

  describe('uploadFile', () => {
    // Note: Use async/await
    it.todo('returns ID of uploaded file');
    it.todo('throws error if upload failed');
  });
  describe('createNote', () => {
    it.todo("creates a 'NOTE' engagement with the correct parameters"); // tests that it uses the right json
  });
});
