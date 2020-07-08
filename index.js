const express = require('express');
const reportingApp = express();

const config = require('./src/server/config');
const typeformClient = require('./src/server/survey/typeformClient')(config);
const getHubspotUserDetails = require('./src/server/report/getHubspotUserDetails');
const reportViewModelBuilder = require('./src/server/report/reportViewModelBuilder')(
  typeformClient,
  getHubspotUserDetails
);
const app = require('./src/server/app')(
  config,
  reportingApp,
  reportViewModelBuilder
);

const port = 8080;

const server = app.listen(port, () => {
  console.log(`ready at http://localhost:${port}`);
});

const jsreport = require('jsreport')({
  store: {
    provider: 'fs',
  },
  extensions: {
    express: {
      app: reportingApp,
      server: app,
    },
    'fs-store': {
      dataDirectory: 'data',
      syncModifications: true,
      sync: {
        usePolling: true,
      },
    },
    templatingEngines: {
      strategy: 'dedicated-process',
      timeout: 40000,
      numberOfWorkers: 2,
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
  appPath: '/reporting',
});

jsreport
  .init()
  .then(() => {
    console.log('jsreport server started');
  })
  .catch((e) => {
    console.error(e);
  });

process.on('SIGTERM', function () {
  server.close(() => {
    console.log('Received SIGTERM, shutting down');
    process.exit(0);
  });
});

process.on('SIGINT', function () {
  console.log('Received SIGINT, shutting down');
  server.close(() => {
    process.exit(0);
  });
});
