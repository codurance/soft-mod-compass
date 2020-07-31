const request = require('supertest');

function appWithMockConfig(configOverrides) {
  const config = { ...mockConfig, ...configOverrides };
  jest.resetModules();
  jest.doMock('./config', () => config);
  const fakeReportingApp = (req, res, next) =>
    res.send('<p>jsreport studio</p>');
  const app = require('./app')(fakeReportingApp);
  return app;
}

const mockConfig = {
  jsreport: {
    studioEditorEnabled: true,
  },
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: 'encoded auth token',
  },
  hubspot: {
    formLandingPageUrl: 'https://hubspot.com/form',
  },
  app: {
    retryUntilSuccess: {
      maxRetries: 10,
      sleepBeforeRetryMs: 0,
    },
  },
};

describe('app', () => {
  let app;
  beforeEach(() => {
    app = appWithMockConfig();
  });

  it('allows access to jsreport studio locally in development', (done) => {
    request(app)
      .get('/reporting')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('does not allow access to jsreport studio in production', (done) => {
    const app = appWithMockConfig({
      jsreport: {
        studioEditorEnabled: false,
      },
    });
    request(app)
      .get('/reporting')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
});
