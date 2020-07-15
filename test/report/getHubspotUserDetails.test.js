const nock = require('nock');

const sleepMock = jest.fn();
sleepMock.mockImplementation(() => Promise.resolve());
jest.doMock('sleep-promise', () => {
  return sleepMock;
});

const testAuthToken = 'MOCK_AUTH_TOKEN';
const mockConfig = {
  hubspot: {
    formId: 'MOCK_FORM_ID',
    authToken: testAuthToken,
  },
};
jest.doMock('../../src/server/config', () => mockConfig);

const getHubspotUserDetails = require('../../src/server/report/getHubspotUserDetails');
describe('getHubspotUserDetails', () => {
  const MOCK_PAGE_URL = 'NOT_USED';
  const MOCK_TIMESTAMP = 1593969791429;
  const OK = 200;
  const MOCK_UUID = 'aaaaaaaa-1111-4444-9999-bbbbbbbbbbbb';

  beforeEach(() => {
    sleepMock.mockClear();
  });

  describe('get survey answers', () => {
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

    afterEach(() => {
      nock.cleanAll();
    });

    it('successfully gets and extract result and applies title case', async () => {
      // Given: Hubspot returns a valid response
      nock(hubspotApiBaseUrl)
        .get(queryFormSubmissions)
        .reply(OK, validResponseFromHubspotWithUserDetails);

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
  });
});
