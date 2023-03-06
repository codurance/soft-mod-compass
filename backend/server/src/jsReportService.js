const jsreport = require('jsreport');
var instance = null;

async function renderPdf(jsReportTemplate, body) {
  return await instance.render({
    template: jsReportTemplate,
    data: body,
  });
}

async function initializeJsReportBackend(app, reportingApp, path) {
  const jsreportOptions = {
    store: {
      provider: 'fs',
    },
    extensions: {
      express: {
        app: reportingApp,
        server: app,
      },
      'fs-store': {
        dataDirectory: path,
        syncModifications: true,
        sync: {
          usePolling: true,
        },
      },
      'chrome-pdf': {
        timeout: 20000,
        strategy: 'chrome-pool',
        numberOfWorkers: 2,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
    templatingEngines: {
      strategy: 'dedicated-process',
      timeout: 40000,
      numberOfWorkers: 2,
      allowedModules: '*',
    },
    sandbox: {
      allowedModules: ['translations'],
    },
    appPath: '/reporting',
  };

  try {
    instance = await jsreport(jsreportOptions).init();
    console.log('jsreport server started');
  } catch (e) {
    console.error(e);
  }
}

module.exports = { initializeJsReportBackend, renderPdf };
