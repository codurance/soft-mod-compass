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
      throw new Error(`Could not store the survey - Reason: ${err.message}`);
    });
}

async function updateToSucceedState(id) {
  const params = {
    TableName: 'Surveys',
    Key: { id },
    UpdateExpression: 'set surveyState = :surveyState',
    ExpressionAttributeValues: {
      ':surveyState': 'succeed',
    },
    ReturnValues: 'UPDATED_NEW',
  };

  documentDynamoClient
    .update(params)
    .promise()
    .catch((err) => {
      throw new Error(`Could not update the survey - Reason: ${err.message}`);
    });
}

module.exports = { saveFailedSurvey, updateToSucceedState };
