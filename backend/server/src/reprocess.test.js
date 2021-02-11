const supertest = require('supertest');
const express = require('express');
const fakeRequestBody = require('./mockData/post_survey_request_body.json');
const dynamoClient = require('./mockData/DynamoDbTestClient');
const mockConfig = {
  jsreport: {
    studioEditorEnabled: true,
  },
  hubspot: {
    authToken: 'fake token',
    portalId: 'portalid',
    formId: 'formId',
  },
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports Folder Path',
    },
  },
  cors: {},
};
const config = { ...mockConfig };

jest.doMock('./config', () => config);
const jsReportMock = jest.fn();
jest.doMock('./jsreportAdapter', () => jsReportMock);
const uuidGenerator = jest.fn();
jest.doMock('uuid/v4', () => uuidGenerator);

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store survey in failed state when generate pdf fails', (done) => {
    // create generate pdf report mock
    jsReportMock.mockImplementation((args) => {
      throw new Error('mocked error');
    });
    const uuidMock = '1111';
    uuidGenerator.mockReturnValue(uuidMock);
    const app = require('./app')(express());
    supertest(app)
      .post('/surveys')
      .send(fakeRequestBody)
      .then((res) => {
        expect(res.status).toBe(202);
        expect(res.body).toEqual({});

        setTimeout(async () => {
          const surveyFailed = await findSurveyWithId(uuidMock);
          expect(surveyFailed.surveyState).toEqual('failed');
          expect(surveyFailed.bodyRequest).toEqual(fakeRequestBody);
          done();
        }, 1000);
      });

    //expect survey state
    //expect initial request body to be in the database
  });
});

async function findSurveyWithId(uuidMock) {
  const { Item } = await dynamoClient
    .get({ TableName: 'Surveys', Key: { id: uuidMock } })
    .promise();
  console.log('Item ', Item);
  return Item;
}
