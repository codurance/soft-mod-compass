const path = require('path');
const express = require('express');
const reportingApp = express();
const app = require('./src/app')(reportingApp);

const port = 8080;
const server = app.listen(port, () => {
  console.log(`ready at http://localhost:${port}`);
});

const reportDataDir = path.resolve(__dirname, 'reportData');
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
      dataDirectory: reportDataDir,
      syncModifications: true,
      sync: {
        usePolling: true,
      },
    },
    'chrome-pdf': {
      timeout: 200000,
      strategy: 'chrome-pool',
      numberOfWorkers: 2,
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      scripts: {
        timeout: 700000,
      },
      express: {
        renderTimeout: 700000,
      },
    },
  },
  templatingEngines: {
    strategy: 'dedicated-process',
    timeout: 200000,
    numberOfWorkers: 2,
    allowedModules: '*',
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
