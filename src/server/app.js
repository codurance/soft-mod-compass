const path = require('path')
const jsreport = require('jsreport')
const express = require('express')
const favicon = require('serve-favicon')
const merge = require('easy-pdf-merge');

const stripHubspotSubmissionGuid = require('./middleware/stripHubspotSubmissionGuid')
const base64Encode = require('./encoding/base64')

module.exports = (config, reportingApp, buildReportViewModelFor) => {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '/views'))
  app.use(stripHubspotSubmissionGuid)
  app.use(express.static('dist'))
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp)
  }

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/scores/:uuid', (req, res) => {
    buildReportViewModelFor(req.params.uuid)
      .then(viewModel => {
        res.send(base64Encode(viewModel.scores.toString()))
      })
  })

  app.get('/report/:uuid', (req, res) => {
    merge([`${__dirname}/../../data/pdf/Document A.pdf`,`${__dirname}/../../data/pdf/Document B.pdf`, `${__dirname}/../../data/pdf/Document C.pdf`],`${__dirname}/../../data/pdf/Test Output.pdf`,function(err){
      if(err) {
        return console.log(err);
      }

      console.log('Successfully merged!');
    });

    buildReportViewModelFor(req.params.uuid)
      .then(viewModel => {
        jsreport.render({
          template: {
            name: 'Compass',
            engine: 'handlebars',
            recipe: 'chrome-pdf'
          },
          data: viewModel
        }).then((out) => {
          out.stream.pipe(res)
        }).catch((e) => {
          res.end(e.message)
        })
      })
  })

  return app
}
