const rp = require('request-promise');
const sleep = require('sleep-promise');

module.exports = (config, sleepBeforeRetryMs) => {
  const headers = {
    Authorization: `Bearer ${config.typeform.authToken}`,
  };

  return {
    surveyAnswersFor,
    getQuestionChoices,
  };

  function surveyAnswersFor(uuid, retries = 30) {
    const options = {
      uri: `${config.typeform.url}/forms/${config.typeform.formId}/responses?query=${uuid}`,
      headers,
      json: true,
    };

    return rp(options).then((results) => {
      if (results.items.length > 0) {
        return results.items[0].answers.map((answer) => answer.choice.label);
      } else {
        const retriesLeft = retries - 1;
        if (retriesLeft === 0) {
          throw Error(`no survey answers for ${uuid}`);
        }

        return sleep(sleepBeforeRetryMs).then(() =>
          surveyAnswersFor(uuid, retriesLeft)
        );
      }
    });
  }

  function getQuestionChoices() {
    const options = {
      uri: `${config.typeform.url}/forms/${config.typeform.formId}`,
      headers,
      json: true,
    };

    return rp(options).then((results) => {
      return results.fields.map((question) =>
        question.properties.choices.map((choice) => choice.label)
      );
    });
  }
};
