const config = require('../config');
const sleep = require('sleep-promise');

const maxRetries = config.app.retryUntilSuccessful.maxRetries;
const sleepBeforeRetryMs = config.app.retryUntilSuccessful.sleepBeforeRetryMs;
const retryUntilSuccesful = async (functionToTry, condition) => {
  return await doRetryUntilSuccesful(functionToTry, condition, 0);
};

const doRetryUntilSuccesful = async (functionToTry, condition, retryCount) => {
  if (retryCount === maxRetries)
    throw Error(`Did not succeed after retrying ${maxRetries} times`);

  const res = await functionToTry();

  return condition(res)
    ? res
    : sleep(sleepBeforeRetryMs).then(() =>
        doRetryUntilSuccesful(functionToTry, condition, retryCount + 1)
      );
};

module.exports = retryUntilSuccesful;
