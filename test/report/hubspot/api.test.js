const nock = require('nock');

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
  const MOCK_PAGE_URL = 'NOT_USED';
  const MOCK_TIMESTAMP = 1593969791429;
  const OK = 200;
  const MOCK_UUID = 'aaaaaaaa-1111-4444-9999-bbbbbbbbbbbb';

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('getFormSubmission', () => {
    const hubspotApiBaseUrl = 'https://api.hubapi.com';
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
    it.todo('retries mulitple times if form submission not found for UUID'); //Note: Use 'retryUntilSuccessfulMock'
    it.todo('throws error if form submission not found for UUID after retries');

    describe.skip('get survey answers', () => {
      it('retries multiple times if answers are empty', async () => {
        // TODO: Migrate to above tests
        nock(hubspotApiBaseUrl)
          .get(queryFormSubmissions)
          .reply(OK, emptyResponse)
          .get(queryFormSubmissions)
          .reply(OK, emptyResponse)
          .get(queryFormSubmissions)
          .reply(OK, validResponseFromHubspotWithUserDetails);

        const result = await getHubspotUserDetails(MOCK_UUID);
        expect(result).toHaveProperty(['values', 0, 'value'], 'Sarah');
      });
    });
  });
  describe('getContactId', () => {
    // Note: Use async/await.
    it.todo('returns the user ID for email');
    it.todo('throws error if user not found');
  });
  describe('uploadFile', () => {
    // Note: Use async/await
    it.todo('returns ID of uploaded file');
    it.todo('throws error if upload failed');
  });
  // describe('createNote', () => {
  //   // Note: Use async/await
  //   it.todo('Returns ID of uploaded file');
  //   it.todo('Throws error if upload failed');
  // });
});
