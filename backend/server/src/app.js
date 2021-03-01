const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const {
  saveFailedSurvey,
  dbHealthCheck,
} = require('./survey/surveyRepository');
const { processSurvey, reProcessSurvey } = require('./survey/surveyService');
//put a timestamp on each line of logs - required for cloudwatch log streaming
require('log-timestamp');
const SurveyStatus = require('./survey/SurveyState');

module.exports = (reportingApp) => {
  const app = express();
  if (config.cors.allowedOrigin)
    app.use(
      cors({
        origin: config.cors.allowedOrigin,
        methods: 'POST',
      })
    );
  app.use(bodyParser.json({ limit: '50mb' })); // support json encoded bodies
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies
  if (config.jsreport.studioEditorEnabled) {
    app.use('/reporting', reportingApp);
  }

  app.get('/', (req, res) => {
    dbHealthCheck()
      .then(() => res.status(200).send({ status: 'up', database: 'up' }))
      .catch((reason) =>
        res.status(500).send({ status: 'up', database: 'down', reason })
      );
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
        console.error('error in processSurvey app ', reason);
      });
    res.sendStatus(202);
  });

  app.patch('/surveys/:id', async (req, res) => {
    const { id } = req.params;
    try {
      console.log('Reprocessing survey with id: ' + id);
      const status = await reProcessSurvey(id);
      if (status === SurveyStatus.SUCCEED)
        res.status(200).send({ status: status, id });
      else res.status(400).send({ status: status, id });
    } catch (reason) {
      console.error('error in reProcessSurvey app ', reason);
      res.status(500).send({
        status: 'Error',
        message: `Error reprocessing the survey with id: ${id}`,
        id,
        surveyStatus: 'failed',
        reason,
      });
    }
  });

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
