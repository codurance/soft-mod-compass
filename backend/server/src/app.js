const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const { saveFailedSurvey } = require('./survey/surveyRepository');
const { processSurvey, reProcessSurvey } = require('./survey/surveyService');
require('log-timestamp');

module.exports = (reportingApp) => {
  const app = express();
  if (config.cors.allowedOrigin)
    app.use(
      cors({
        origin: config.cors.allowedOrigin,
        methods: 'POST',
      })
    );
  // app.options('*', cors());
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp);
  }

  app.get('/', (req, res) => {
    res.status(200).send({ status: 'up' });
  });

  app.post('/surveys', (req, res) => {
    console.log(
      'new request incoming... request body :' + JSON.stringify(req.body)
    );

    processSurvey(req.body)
      .then((result) => {
        console.log('request successful :', result);
      })
      .catch((reason) => {
        handleInternalFailure(reason, req);
      });
    res.sendStatus(202);
  });

  app.patch('/surveys/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Reprocessing survey with id: ' + id);
      await reProcessSurvey(id);
      res.status(200).send({ status: 'succeed', id });
    } catch (reason) {
      res.status(500).send({
        status: 'Error',
        message: `Error reprocessing the survey with id: ${id}`,
        id,
        surveyStatus: 'failed',
        reason,
      });
    }
  });

  function handleInternalFailure(reason, req) {
    saveFailedSurvey(req.body).then((id) =>
      console.error(
        JSON.stringify({
          failedSurvey: {
            surveyId: id,
            surveyRequestBody: req.body,
            errorDetails: reason,
          },
        })
      )
    );
  }

  // allow to create failed survey (for testing only)
  app.post('/failed-surveys', (req, res) => {
    saveFailedSurvey(req.body).then((id) => {
      console.error(
        JSON.stringify({
          failedSurvey: {
            surveyId: id,
            surveyRequestBody: req.body,
            errorDetails: 'fake failure',
          },
        })
      );
      res.send(id);
    });
  });

  return app;
};
