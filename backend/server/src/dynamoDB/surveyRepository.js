const { documentDynamoClient } = require('./dynamodbClient');
const generateUuid = require('uuid/v4');

async function saveFailedSurvey(survey) {
  const id = generateUuid();
  const params = {
    TableName: 'Surveys',
    Item: {
      bodyRequest: survey,
      id,
      surveyState: 'failed',
    },
  };

  documentDynamoClient
    .put(params)
    .promise()
    .then(() => id)
    .catch((err) => {
      throw new Error(
        `Could not upload store the survey - Reason: ${err.message}`
      );
    });
}

module.exports = { saveFailedSurvey };
