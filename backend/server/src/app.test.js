const supertest = require('supertest');
const express = require('express');
const fakeRequestBody = require('./mockData/post_survey_request_body.json');
const nock = require('nock');

const renderMock = (function () {
  const renderFunction = jest.fn();
  jest.doMock('./jsreportAdapter', () => renderFunction);
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
    authToken: 'fake token',
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
};
const config = { ...mockConfig };
jest.doMock('./config', () => config);
const uploadedFileUrl = 'http://my-pdf';

function mockHubspotFileApi() {
  const validResponseWithUploadedFileLink = {
    objects: [{ s3_url: uploadedFileUrl }],
  };

  return nock(hubspotApiBaseUrl)
    .post('/filemanager/api/v2/files')
    .query({ hapikey: mockConfig.hubspot.authToken })
    .reply(200, validResponseWithUploadedFileLink);
}

function mockHubspotFormApi() {
  return nock(HubspotFormApi)
    .post(
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
        ],
      }
    )
    .reply(200);
}

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should reply ok when submit survey', async () => {
    const uploadPdfMockServerCall = mockHubspotFileApi();
    const submitFormServerCall = mockHubspotFormApi();

    const app = require('./app')(express());
    const res = await supertest(app).post('/surveys').send(fakeRequestBody);
    expect(renderMock).toHaveBeenCalledWith(
      { engine: 'handlebars', name: 'Compass-EN', recipe: 'chrome-pdf' },
      fakeRequestBody
    );
    expect(uploadPdfMockServerCall.isDone()).toBe(true);
    expect(submitFormServerCall.isDone()).toBe(true);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      userCreated: 'user@company.com',
      pdfUrl: uploadedFileUrl,
    });
  });
});
