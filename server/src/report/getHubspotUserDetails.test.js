const nock = require('nock');

const retryUntilSuccessfulMock = require('../network/retryUntilSuccessfulMock');
jest.doMock('../network/retryUntilSuccessful', () => retryUntilSuccessfulMock);

const testAuthToken = 'MOCK_AUTH_TOKEN';
const mockConfig = {
  hubspot: {
    formId: 'MOCK_FORM_ID',
    authToken: testAuthToken,
  },
  app: {
    hubspot: {
      sleepBeforeRetryMs: 0,
    },
  },
};
jest.doMock('../config', () => mockConfig);

const getHubspotUserDetails = require('./getHubspotUserDetails');

describe('getHubspotUserDetails', () => {
  const MOCK_PAGE_URL = 'NOT_USED';
  const MOCK_TIMESTAMP = 1593969791429;
  const OK = 200;
  const MOCK_UUID = 'aaaaaaaa-1111-4444-9999-bbbbbbbbbbbb';

  describe('get survey answers', () => {
    const hubspotApiBaseUrl = 'https://api.hubapi.com';
    const queryFormSubmissions = `/form-integrations/v1/submissions/forms/${mockConfig.hubspot.formId}?hapikey=${mockConfig.hubspot.authToken}`;
    const validResponse_SubmissionIsOK = {
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
    const validResponse_SubmissionForUuidIsMISSING = {
      results: [
        {
          submittedAt: MOCK_TIMESTAMP,
          values: [
            { name: 'firstname', value: 'someone else' },
            { name: 'lastname', value: 'not our user' },
            { name: 'company', value: 'some company' },
            { name: 'job_function', value: 'intern' },
            { name: 'email', value: 'patrick@notgmail.com' },
            { name: 'uuid', value: 'not-the-uuid-we-re-interested-in' },
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

    afterEach(() => {
      nock.cleanAll();
    });

    it('successfully gets and extract result and applies title case', async () => {
      // Given: Hubspot returns a valid response
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .reply(OK, validResponse_SubmissionIsOK);

      // When: Getting Hubspot user details
      const result = await getHubspotUserDetails(MOCK_UUID);

      // Then: Values for UUID have been extracted and values are using Title Case
      expect(result).toEqual({
        submittedAt: MOCK_TIMESTAMP,
        values: [
          { name: 'firstname', value: 'Sarah' },
          { name: 'lastname', value: 'Some Long Last Name' },
          { name: 'company', value: 'Codurance' },
          { name: 'job_function', value: 'Head Of Heads' },
          { name: 'email', value: 'sarah.baker@notgmail.com' },
          { name: 'uuid', value: MOCK_UUID },
        ],
        pageUrl: MOCK_PAGE_URL,
      });
    });

    it('retries multiple times if answers are empty', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .reply(OK, emptyResponse)
        .get(queryFormSubmissions)
        .reply(OK, emptyResponse)
        .get(queryFormSubmissions)
        .reply(OK, validResponse_SubmissionIsOK);

      const result = await getHubspotUserDetails(MOCK_UUID);
      expect(result).toHaveProperty(['values', 0, 'value'], 'Sarah');
    });

    it('retries multiple times if submission with UUID is not found', async () => {
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .reply(OK, validResponse_SubmissionForUuidIsMISSING)
        .get(queryFormSubmissions)
        .reply(OK, validResponse_SubmissionForUuidIsMISSING)
        .get(queryFormSubmissions)
        .reply(OK, validResponse_SubmissionIsOK);

      const result = await getHubspotUserDetails(MOCK_UUID);
      expect(result).toHaveProperty(['values', 0, 'value'], 'Sarah');
    });
  });
});
