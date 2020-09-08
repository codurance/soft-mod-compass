const path = require('path');
const express = require('express');
const reportingApp = express();

const app = require('./src/app')(reportingApp);

const port = 8080;

const server = app.listen(port, () => {
  console.log(`ready at http://localhost:${port}`);
});

// Add putBucketLifecycleConfigurantion
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });

const params = {
  Bucket: 'compass-dev-en',
  LifecycleConfiguration: {
    Rules: [
      {
        Filter: {
          Prefix: 'compass-report',
        },
        Status: 'Enabled',
        Expiration: {
          Days: 1,
        },
        ID: 'DeleteAfterXDays',
      },
    ],
  },
};

s3.putBucketLifecycleConfiguration(params)
  .promise()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

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
