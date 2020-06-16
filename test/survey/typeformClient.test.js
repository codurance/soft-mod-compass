const nock = require('nock');

const config = {
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: 'encoded auth token',
  },
};
const typeformClient = require('../../src/server/survey/typeformClient')(
  config,
  0
);

describe('typeformClient', () => {
  const OK = 200;

  describe('get survey answers', () => {
    const mockUuid = 'MOCK_UUID';
    const queryAnswersForMockUuidUrl = `/forms/${config.typeform.formId}/responses?query=${mockUuid}`;
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

    it('successfuly get an extract result', (done) => {
      nock(config.typeform.url)
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
      nock(config.typeform.url)
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

      nock(config.typeform.url)
        .get(queryAnswersForMockUuidUrl)
        .times(expectedRetries)
        .reply(OK, answerEmpty);

      try {
        await typeformClient.surveyAnswersFor(mockUuid, expectedRetries);
        fail('did not throw');
      } catch (err) {
        expect(err.message).toEqual(
          `no survey answers for ${mockUuid}` // TODO: Re-introduce number of retries in assertion
        );
      }
    });
  });

  describe('get survey schema', () => {
    it('sucessfully gets and and extract schema', (done) => {
      const questions = [
        { properties: { choices: choicesData() } },
        { properties: { choices: choicesData() } },
      ];

      nock(config.typeform.url)
        .get(`/forms/${config.typeform.formId}`)
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
