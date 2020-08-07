const requestPromise = require('request-promise');
const sleep = require('sleep-promise');
const config = require('../config');

async function makeTypeformRequest(path) {
  const headers = {
    Authorization: `Bearer ${config.typeform.authToken}`,
  };
  const options = {
    uri: `https://mashooqbadar.typeform.com${path}`,
    headers,
    json: true,
  };
  return requestPromise(options);
}

async function surveyAnswersFor(uuid, retries = 30, retriesLeft = retries) {
  const ensureEnoughRetriesLeft = () => {
    if (retriesLeft === 0) throw Error(`no survey answers for ${uuid}`);
  };
  const sleepAndTryAgain = async () => {
    await sleep(config.app.typeform.sleepBeforeRetryMs);
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
  const results = await makeTypeformRequest(`/forms/${config.typeform.formId}`);
  return results.fields.map((question) =>
    question.properties.choices.map((choice) => choice.label)
  );
}

module.exports = {
  surveyAnswersFor,
  getQuestionChoices,
};
