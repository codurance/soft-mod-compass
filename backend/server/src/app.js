const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const { saveFailedSurvey } = require('./survey/surveyRepository');
const { processSurvey, reProcessSurvey } = require('./survey/surveyService');

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
    console.log('new request incoming... request body' + req.body);

    processSurvey(req.body)
      .then((result) => {
        console.log('request successful :', result);
      })
      .catch((reason) => {
        handleInternalFailure(reason, req);
      });
    res.sendStatus(202);
    console.log('ready for new requests...');
  });

  app.patch('/surveys/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Reproccesing survey with id:' + id);
      await reProcessSurvey(id);
      res.status(200).send({ status: 'succeed', id });
    } catch (reason) {
      handleInternalFailure(reason, req);
      res.status(500).send({
        status: 'Error',
        message: `Error reproccesing the survey with id: ${id}`,
        id,
        surveyStatus: 'failed',
        reason,
      });
    }
  });

  function handleInternalFailure(reason, req) {
    console.error(`error in request ${req.method} ${req.uri} `, reason);
    saveFailedSurvey(req.body).then((id) =>
      console.log({
        failedSurvey: {
          surveyId: id,
          surveyRequestBody: req.body,
          errorDetails: reason,
        },
      })
    );
  }

  // allow to create failed survey (for testing only)
  app.post('/failed-surveys', (req, res) => {
    saveFailedSurvey(req.body).then((id) => {
      console.log({
        failedSurvey: {
          surveyId: id,
          surveyRequestBody: req.body,
          errorDetails: 'fake failure',
        },
      });
      res.send(id);
    });
  });

  return app;
};
