const express = require('express');
const reportingApp = express();
const app = require('./src/app')(reportingApp);

const port = 8080;
const server = app.listen(port, () => {
  console.log(`ready at http://localhost:${port}`);
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
