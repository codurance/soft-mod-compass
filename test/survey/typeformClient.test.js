const nock = require('nock');
const { range1toN } = require('../testUtils');

const sleepMock = jest.fn();
sleepMock.mockImplementation(() => Promise.resolve());

function typeformClientWithMockConfig(configOverrides) {
  const config = { ...mockConfig, ...configOverrides };
  jest.resetModules();
  jest.doMock('sleep-promise', () => sleepMock);
  jest.doMock('../../src/server/config', () => config);
  const typeformClient = require('../../src/server/survey/typeformClient');
  return typeformClient;
}

const testAuthToken = 'MOCK AUTH TOKEN';
const mockConfig = {
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: testAuthToken,
  },
  app: {
    typeform: { sleepBeforeRetryMs: 0 },
    retryUntilSuccess: {
      maxRetries: 10,
      sleepBeforeRetryMs: 0,
    },
  },
};

describe('typeformClient', () => {
  const OK = 200;
  let typeformClient;

  beforeEach(() => {
    sleepMock.mockClear();
    typeformClient = typeformClientWithMockConfig();
  });

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

    it('retries no more than the given parameter', async () => {
      const expectedRetries = 3;

      typeformClient = typeformClientWithMockConfig({
        app: {
          typeform: { sleepBeforeRetryMs: 0 },
          retryUntilSuccess: {
            maxRetries: expectedRetries,
            sleepBeforeRetryMs: 0,
          },
        },
      });

      nock(mockConfig.typeform.url)
        .get(queryAnswersForMockUuidUrl)
        .times(expectedRetries)
        .reply(OK, answerEmpty);

      try {
        await typeformClient.surveyAnswersFor(mockUuid, expectedRetries);
        fail('did not throw');
      } catch (err) {
        expect(err.message).toEqual(
          `No survey answers for ${mockUuid}` // TODO: Re-introduce number of retries in assertion
        );
      }
    });

    it("sleeps 'sleepBeforeRetryMs' (from config) before retrying", async () => {
      const mockSleepDuration = 100;
      const expectedRetries = 3;

      typeformClient = typeformClientWithMockConfig({
        app: {
          typeform: { sleepBeforeRetryMs: mockSleepDuration },
          retryUntilSuccess: {
            maxRetries: 10,
            sleepBeforeRetryMs: mockSleepDuration,
          },
        },
      });

      nock(mockConfig.typeform.url)
        .get(queryAnswersForMockUuidUrl)
        .times(expectedRetries)
        .reply(OK, answerEmpty)
        .get(queryAnswersForMockUuidUrl)
        .reply(OK, answerWithTwoItems);

      await typeformClient.surveyAnswersFor(mockUuid, 10);
      expect(sleepMock).toHaveBeenCalledTimes(expectedRetries);
      for (const i of range1toN(expectedRetries)) {
        expect(sleepMock).toHaveBeenNthCalledWith(i, mockSleepDuration);
      }
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
