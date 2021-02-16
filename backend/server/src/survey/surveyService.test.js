const requestBody = require('../mockData/post_survey_request_body.json');

const surveyRepositoryMock = {
  saveRequestedSurvey: jest.fn(),
  updateSurveyToSucceedState: jest.fn(),
  getSurveyById: jest.fn(),
};
jest.doMock('./surveyRepository', () => surveyRepositoryMock);

const surveyOrchestratorMock = {
  submitSurvey: jest.fn(),
};
jest.doMock('./surveyOrchestrator', () => surveyOrchestratorMock);

const { processSurvey, reProcessSurvey } = require('./surveyService');
const mockedId = '123';

describe('surveyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should process a survey', async () => {
    surveyRepositoryMock.saveRequestedSurvey.mockImplementation(() => mockedId);
    const resultId = await processSurvey(requestBody);

    expect(surveyRepositoryMock.saveRequestedSurvey).toHaveBeenCalledTimes(1);
    expect(surveyOrchestratorMock.submitSurvey).toHaveBeenCalledTimes(1);
    expect(
      surveyRepositoryMock.updateSurveyToSucceedState
    ).toHaveBeenCalledTimes(1);
    expect(resultId).toBe(mockedId);
  });

  it('should reprocess a failed survey', async () => {
    const surveyDbItem = {
      id: mockedId,
      surveyState: 'failed',
      bodyRequest: { user: 'fakeUser' },
    };
    surveyRepositoryMock.getSurveyById.mockImplementation(() => surveyDbItem);

    await reProcessSurvey(requestBody);

    expect(surveyRepositoryMock.getSurveyById).toHaveBeenCalledTimes(1);
    expect(surveyOrchestratorMock.submitSurvey).toHaveBeenCalledTimes(1);
    expect(
      surveyRepositoryMock.updateSurveyToSucceedState
    ).toHaveBeenCalledTimes(1);
  });
});
