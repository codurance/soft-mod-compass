const supertest = require('supertest');
const express = require('express');
const fakeRequestBody = require('./mockData/post_survey_request_body.json');
const { documentDynamoClient } = require('./dynamoDB/dynamodbClient');
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

const uploadReportToHubspotMock = {
  uploadReportToHubspot: jest.fn(),
  submitHubspotForm: jest.fn(),
};
jest.doMock(
  './report/hubspot/uploadToHubspot',
  () => uploadReportToHubspotMock
);

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store survey in failed state when generate pdf fails', (done) => {
    // create generate pdf report mock
    jsReportMock.mockImplementation(() => {
      throw new Error('jsReportMockError');
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
  });

  it('should store survey in failed state when report is uploaded to HubSpot', (done) => {
    jsReportMock.mockImplementation(() => ({ content: '' }));
    uploadReportToHubspotMock.uploadReportToHubspot.mockImplementation(() => {
      throw new Error('uploadReportToHubspotError');
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
  });
  it('should store survey in failed state when the survey data is submitted HubSpot', (done) => {
    jsReportMock.mockImplementation(() => ({ content: '' }));
    uploadReportToHubspotMock.uploadReportToHubspot.mockImplementation(
      () => {}
    );
    uploadReportToHubspotMock.submitHubspotForm.mockImplementation(() => {
      throw new Error('submitHubspotFormError');
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
  });
});

async function findSurveyWithId(uuidMock) {
  const { Item } = await documentDynamoClient
    .get({ TableName: 'Surveys', Key: { id: uuidMock } })
    .promise();
  console.log('Item ', Item);
  return Item;
}
