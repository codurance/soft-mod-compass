const retryUntilSuccesfulMock = jest.fn();

retryUntilSuccesfulMock.mockImplementation(async (functionToTry, condition) => {
  const res = await functionToTry();

  return condition(res)
    ? res
    : retryUntilSuccesfulMock(functionToTry, condition);
});

module.exports = retryUntilSuccesfulMock;
