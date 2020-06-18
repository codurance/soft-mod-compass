const request = require('request-promise');
const sleep = require('sleep-promise');

module.exports = (config, sleepBeforeRetryMs) => {
  const headers = {
    Authorization: `Bearer ${config.typeform.authToken}`,
  };

  return {
    surveyAnswersFor,
    getQuestionChoices,
  };

  async function makeTypeformRequest(path) {
    const options = {
      uri: `${config.typeform.url}${path}`,
      headers,
      json: true,
    };
    return request(options);
  }

  async function surveyAnswersFor(uuid, retries = 30, retriesLeft = retries) {
    const ensureEnoughRetriesLeft = () => {
      if (retriesLeft === 0) throw Error(`no survey answers for ${uuid}`);
    };
    const sleepAndTryAgain = async () => {
      await sleep(sleepBeforeRetryMs);
      return surveyAnswersFor(uuid, retriesLeft - 1);
    };
    const extractAnswers = (results) =>
      results.items[0].answers.map((answer) => answer.choice.label);
    const queryAnswerForUuidUrl = `/forms/${config.typeform.formId}/responses?query=${uuid}`;

    ensureEnoughRetriesLeft();
    const results = await makeTypeformRequest(queryAnswerForUuidUrl);
    if (results.items.length > 0) {
      return extractAnswers(results);
    } else {
      return sleepAndTryAgain();
    }
  }

  async function getQuestionChoices() {
    const results = await makeTypeformRequest(
      `/forms/${config.typeform.formId}`
    );
    return results.fields.map((question) =>
      question.properties.choices.map((choice) => choice.label)
    );
  }
};
