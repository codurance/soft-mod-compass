const requestPromise = require('request-promise');
const config = require('../config');
const retryUntilSuccessful = require('../network/retryUntilSuccessful');

async function makeTypeformRequest(path) {
  const headers = {
    Authorization: `Bearer ${config.typeform.authToken}`,
  };
  const options = {
    uri: `https://codurance.typeform.com${path}`,
    headers,
    json: true,
  };
  return requestPromise(options);
}

async function surveyAnswersFor(uuid) {
  const extractAnswers = (results) =>
    results.items[0].answers.map((answer) => answer.choice.label);
  const queryAnswerForUuidUrl = `/forms/${config.typeform.formId}/responses?query=${uuid}`;

  return retryUntilSuccessful(
    () => makeTypeformRequest(queryAnswerForUuidUrl),
    (res) => res.items.length > 0
  ).then(extractAnswers);
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
