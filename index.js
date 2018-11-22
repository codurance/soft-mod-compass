const express = require('express')
const reportingApp = express()

const config = require('./src/server/config')
const app = require('./src/server/app')(config, reportingApp)
const port = 8080

const server = app.listen(port, () => {
  console.log(`ready at http://localhost:${port}`)
})

const jsreport = require('jsreport')({
  store: {
    provider: 'fs'
  },
  extensions: {
    express: {
      app: reportingApp,
      server: app
    },
    'fs-store': {
      dataDirectory: 'data',
      syncModifications: true,
      sync: {
        usePolling: true
      }
    },
    'chrome-pdf': {
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }
  },
  appPath: '/reporting'
})

jsreport.init()
  .then(() => {
    console.log('jsreport server started')
  })
  .catch((e) => {
    console.error(e)
  })

process.on('SIGTERM', function () {
  server.close(() => {
    console.log('Received SIGTERM, shutting down')
    process.exit(0)
  })
})

process.on('SIGINT', function () {
  console.log('Received SIGINT, shutting down')
  server.close(() => {
    process.exit(0)
  })
})
