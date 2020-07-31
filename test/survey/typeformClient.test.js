const nock = require('nock');

const retryUntilSuccessfulMock = require('../network/retryUntilSuccessfulMock');
jest.doMock(
  '../../src/server/network/retryUntilSuccessful',
  () => retryUntilSuccessfulMock
);

const testAuthToken = 'MOCK AUTH TOKEN';
const mockConfig = {
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: testAuthToken,
  },
};
jest.doMock('../../src/server/config', () => mockConfig);

const typeformClient = require('../../src/server/survey/typeformClient');
describe('typeformClient', () => {
  const OK = 200;

  describe('get survey answers', () => {
    const mockUuid = 'MOCK_UUID';
    const queryAnswersForMockUuidUrl = `/forms/${mockConfig.typeform.formId}/responses?query=${mockUuid}`;
    const answerEmpty = { items: [] };
    const answerWithTwoItems = {
      items: [
        {
          answers: [{ choice: { label: 'one' } }, { choice: { label: 'two' } }],
        },
      ],
    };
    const expectedTwoItems = ['one', 'two'];

    afterEach(() => {
      nock.cleanAll();
    });

    it('sends auth header', async () => {
      nock(mockConfig.typeform.url)
        .get(queryAnswersForMockUuidUrl)
        .reply(OK, function () {
          const requestHeaders = this.req.headers;
          const expectedAuthHeader = `Bearer ${testAuthToken}`;

          expect(requestHeaders).toHaveProperty('authorization');
          expect(requestHeaders['authorization']).toBe(expectedAuthHeader);

          return answerWithTwoItems;
        });

      await typeformClient.surveyAnswersFor(mockUuid);
    });

    it('successfully gets and extract result', (done) => {
      nock(mockConfig.typeform.url)
        .get(queryAnswersForMockUuidUrl)
        .reply(OK, answerWithTwoItems);

      typeformClient
        .surveyAnswersFor(mockUuid)
        .then((res) => {
          expect(res).toEqual(expectedTwoItems);
          done();
        })
        .catch(done);
    });

    it('retries multiple times if answers are empty', (done) => {
      nock(mockConfig.typeform.url)
        .get(queryAnswersForMockUuidUrl)
        .reply(OK, answerEmpty)
        .get(queryAnswersForMockUuidUrl)
        .reply(OK, answerEmpty)
        .get(queryAnswersForMockUuidUrl)
        .reply(OK, answerWithTwoItems);

      typeformClient
        .surveyAnswersFor(mockUuid)
        .then((res) => {
          expect(res).toEqual(expectedTwoItems);
          done();
        })
        .catch(done);
    });
  });

  describe('get survey schema', () => {
    it('sucessfully gets and extract schema', (done) => {
      const questions = [
        { properties: { choices: choicesData() } },
        { properties: { choices: choicesData() } },
      ];

      nock(mockConfig.typeform.url)
        .get(`/forms/${mockConfig.typeform.formId}`)
        .reply(OK, {
          fields: questions,
        });

      typeformClient
        .getQuestionChoices()
        .then((questions) => {
          expect(questions).toEqual([
            ['one', 'two', 'three'],
            ['one', 'two', 'three'],
          ]);
          done();
        })
        .catch(done);
    });
  });
});

function choicesData() {
  return [{ label: 'one' }, { label: 'two' }, { label: 'three' }];
}
