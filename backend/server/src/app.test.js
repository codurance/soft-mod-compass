const supertest = require('supertest');
const express = require('express');
const fakeRequestBody = require('./mockData/post_survey_request_body.json');
const nock = require('nock');
const { documentDynamoClient } = require('./dynamodbClient');
const uuidGenerator = jest.fn();
jest.doMock('uuid/v4', () => uuidGenerator);

const renderMock = (function () {
  const renderFunction = jest.fn();
  jest.doMock('./jsReportService', () => {
    return { renderPdf: renderFunction, initializeJsReportBackend: jest.fn() };
  });
  renderFunction.mockReturnValue({ content: 'pdf File' });
  return renderFunction;
})();
const HubspotFormApi = 'https://api.fakeform.com';
const hubspotApiBaseUrl = 'https://api.fakeapi.com';

const mockConfig = {
  jsreport: {
    studioEditorEnabled: true,
  },
  hubspot: {
    privateAppToken: 'fake token',
    portalId: 'portalid',
    formId: 'formId',
    formApiUrl: HubspotFormApi,
    fileApiUrl: hubspotApiBaseUrl,
  },
  app: {
    hubspot: {
      reportsFolder: 'Compass Reports Folder Path',
    },
  },
  cors: {},
  dynamoDBMockEndpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
};
const config = { ...mockConfig };
jest.doMock('./config', () => config);
const uploadedFileUrl = 'http://my-pdf';

function mockHubspotFileApi() {
  const validResponseWithUploadedFileLink = {
    objects: [{ s3_url: uploadedFileUrl }],
  };

  return nock(hubspotApiBaseUrl, {
    authorization: `Bearer ${mockConfig.hubspot.privateAppToken}`,
  })
    .post('/filemanager/api/v3/files/upload')
    .reply(200, validResponseWithUploadedFileLink);
}

function mockHubspotFormApi() {
  return nock(HubspotFormApi).post(
    `/submissions/v3/integration/submit/${mockConfig.hubspot.portalId}/${mockConfig.hubspot.formId}`,
    {
      fields: [
        {
          name: 'email',
          value: 'user@company.com',
        },
        {
          name: 'firstname',
          value: 'First Name',
        },
        {
          name: 'lastname',
          value: 'Last Name',
        },
        {
          name: 'company',
          value: 'Some Company',
        },
        {
          name: 'compass_language',
          value: 'en',
        },
        {
          name: 'report',
          value: uploadedFileUrl,
        },
        {
          name: 'job_function',
          value: 'CEO',
        },
        {
          name: 'xp_practices_score',
          value: 75,
        },
        {
          name: 'team_effectiveness_score',
          value: 50,
        },
        {
          name: 'organisationalmaturity_score',
          value: 75,
        },
        {
          name: 'continuousdelivery_score',
          value: 50,
        },
        {
          name: 'culture_score',
          value: 25,
        },
      ],
      legalConsentOptions: {
        legitimateInterest: {
          value: true,
          subscriptionTypeId: 4603721,
          legalBasis: 'CUSTOMER',
          text:
            'Codurance needs the contact information you provide to us to contact you about our products and services. As responsible for the treatment, Codurance has the necessary technical, organizational and human resources to guarantee the security and protection of its information systems, as well as the data and information stored in them. Your personal data will be treated to comply with both the legal obligations that are applicable, as well as the rights and obligations contained in the contracts you may have with us as well as the services you require. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.',
        },
      },
      context: {
        ipAddress: 'mockedIp',
      },
    }
  );
}

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should reply ok when submit survey', (done) => {
    const uploadPdfMockServerCall = mockHubspotFileApi();
    const submitFormServerCall = mockHubspotFormApi();
    const uuidMock = '1111';
    uuidGenerator.mockReturnValue(uuidMock);
    const app = require('./app')(express());

    supertest(app)
      .post('/surveys')
      .send(fakeRequestBody)
      .then((res) => {
        expect(res.status).toBe(202);
        expect(res.body).toEqual({});
        submitFormServerCall.reply(200, function (uri, requestBody) {
          expect(uploadPdfMockServerCall.isDone()).toBe(true);

          expect(renderMock).toHaveBeenCalledWith(
            {
              engine: 'handlebars',
              name: 'Compass-EN',
              recipe: 'chrome-pdf',
            },
            fakeRequestBody
          );
          setTimeout(async () => {
            const surveySucceed = await findSurveyWithId(uuidMock);
            expect(surveySucceed.surveyState).toEqual('succeed');
            expect(surveySucceed.bodyRequest).toEqual(fakeRequestBody);
            done();
          }, 1000);
        });
      });
  });
});

async function findSurveyWithId(uuidMock) {
  const { Item } = await documentDynamoClient
    .get({ TableName: 'Surveys', Key: { id: uuidMock } })
    .promise();
  return Item;
}
