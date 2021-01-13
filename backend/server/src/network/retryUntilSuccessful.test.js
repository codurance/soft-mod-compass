const sleepMock = jest.fn();
sleepMock.mockImplementation(() => Promise.resolve());

function retryUntilSuccesful_withMockConfig(
  maxRetries = 1000,
  sleepBeforeRetryMs = 0
) {
  const config = {
    app: {
      retryUntilSuccessful: {
        maxRetries: maxRetries,
        sleepBeforeRetryMs: sleepBeforeRetryMs,
      },
    },
  };
  jest.resetModules();
  jest.doMock('sleep-promise', () => sleepMock);
  jest.doMock('../config', () => config);
  return require('./retryUntilSuccessful');
}

describe('Retry until successful', () => {
  const SUCCESS = 'success';
  const FAILURE = 'failure';
  const functionToTry = jest.fn();
  const trueOnSuccess = (res) => res === SUCCESS;
  let retryUntilSuccesful;

  beforeEach(() => {
    jest.clearAllMocks();
    retryUntilSuccesful = retryUntilSuccesful_withMockConfig();
  });

  it('returns result if condition is true', async () => {
    functionToTry.mockReturnValue(SUCCESS);

    const result = await retryUntilSuccesful(functionToTry, trueOnSuccess);

    expect(functionToTry).toHaveBeenCalledTimes(1);
    expect(result).toBe(SUCCESS);
  });

  it('retries until condition is true', async () => {
    functionToTry
      .mockReturnValueOnce(FAILURE)
      .mockReturnValueOnce(FAILURE)
      .mockReturnValueOnce(SUCCESS);

    const result = await retryUntilSuccesful(functionToTry, trueOnSuccess);

    expect(functionToTry).toHaveBeenCalledTimes(3);
    expect(result).toBe(SUCCESS);
  });

  it("retries at most 'maxRetries' (configured in config)", async () => {
    const maxRetries = 4;
    retryUntilSuccesful = retryUntilSuccesful_withMockConfig(maxRetries, 0);
    functionToTry.mockReturnValue(FAILURE);

    await expect(
      retryUntilSuccesful(functionToTry, trueOnSuccess)
    ).rejects.toThrowError(
      `Did not succeed after retrying ${maxRetries} times`
    );

    expect(functionToTry).toHaveBeenCalledTimes(4);
  });

  it('handles async functions', async () => {
    functionToTry
      .mockReturnValueOnce(Promise.resolve(FAILURE))
      .mockReturnValueOnce(Promise.resolve(FAILURE))
      .mockReturnValueOnce(Promise.resolve(SUCCESS));

    const result = await retryUntilSuccesful(functionToTry, trueOnSuccess);

    expect(functionToTry).toHaveBeenCalledTimes(3);
    expect(result).toBe(SUCCESS);
  });

  describe("Sleep 'sleepBeforeRetryMs' (configured in config) before retrying", () => {
    const sleepDelay = 1234;
    beforeEach(() => {
      retryUntilSuccesful = retryUntilSuccesful_withMockConfig(
        1000,
        sleepDelay
      );
    });

    it('does not sleep if condition is true first time around', async () => {
      functionToTry.mockReturnValue(SUCCESS);
      await retryUntilSuccesful(functionToTry, trueOnSuccess);
      expect(sleepMock).toHaveBeenCalledTimes(0);
    });

    it('sleeps once when retrying once', async () => {
      functionToTry.mockReturnValueOnce(FAILURE).mockReturnValueOnce(SUCCESS);
      await retryUntilSuccesful(functionToTry, trueOnSuccess);
      expect(sleepMock).toHaveBeenCalledWith(sleepDelay);
    });

    it('sleeps multiple times when retrying multiple times', async () => {
      functionToTry
        .mockReturnValueOnce(FAILURE)
        .mockReturnValueOnce(FAILURE)
        .mockReturnValueOnce(FAILURE)
        .mockReturnValueOnce(FAILURE)
        .mockReturnValueOnce(SUCCESS);
      await retryUntilSuccesful(functionToTry, trueOnSuccess);
      expect(sleepMock).toHaveBeenCalledTimes(4);
    });
  });
});
