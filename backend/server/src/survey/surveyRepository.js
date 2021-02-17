const { documentDynamoClient, dbHealthCheck } = require('../dynamodbClient');
const generateUuid = require('uuid/v4');
const TABLE_NAME = 'Surveys';

function saveFailedSurvey(survey) {
  const id = generateUuid();
  const params = {
    TableName: TABLE_NAME,
    Item: {
      bodyRequest: survey,
      id,
      surveyState: 'failed',
    },
  };
  return documentDynamoClient
    .put(params)
    .promise()
    .then(() => id)
    .catch((err) => {
      throw new Error(
        `Could not store a failed survey - Reason: ${err.message}`
      );
    });
}

function saveRequestedSurvey(survey) {
  const id = generateUuid();
  const params = {
    TableName: TABLE_NAME,
    Item: {
      bodyRequest: survey,
      id,
      surveyState: 'requested',
    },
  };
  return documentDynamoClient
    .put(params)
    .promise()
    .then(() => id)
    .catch((err) => {
      throw new Error(
        `Could not store the requested survey - Reason: ${err.message}`
      );
    });
}

async function updateSurveyToSucceedState(id) {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set surveyState = :surveyState',
    ExpressionAttributeValues: {
      ':surveyState': 'succeed',
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return documentDynamoClient
    .update(params)
    .promise()
    .catch((err) => {
      throw new Error(`Could not update the survey - Reason: ${err.message}`);
    });
}

function getSurveyById(id) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return documentDynamoClient
    .get(params)
    .promise()
    .then(({ Item }) => Item)
    .catch((err) => {
      throw new Error(`Could not get the survey - Reason: ${err.message}`);
    });
}

module.exports = {
  saveFailedSurvey,
  saveRequestedSurvey,
  updateSurveyToSucceedState,
  getSurveyById,
  dbHealthCheck: () => dbHealthCheck(TABLE_NAME),
};
