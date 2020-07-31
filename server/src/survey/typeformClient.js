const requestPromise = require('request-promise');
const config = require('../config');
const retryUntilSuccessful = require('../network/retryUntilSuccessful');

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
  const extractAnswers = (results) =>
    results.items[0].answers.map((answer) => answer.choice.label);
  const queryAnswerForUuidUrl = `/forms/${config.typeform.formId}/responses?query=${uuid}`;

  try {
    const results = await retryUntilSuccessful(
      () => makeTypeformRequest(queryAnswerForUuidUrl),
      (res) => res.items.length > 0
    );
    return extractAnswers(results);
  } catch (err) {
    throw Error(`No survey answers for ${uuid}`);
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
