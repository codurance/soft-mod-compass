const { documentDynamoClient } = require('../dynamodbClient');
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
      throw new Error(`Could not store the survey - Reason: ${err.message}`);
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

  documentDynamoClient
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
      throw new Error(`Could not update the survey - Reason: ${err.message}`);
    });
}

function dbHealthCheck() {
  const params = {
    TableName: TABLE_NAME,
  };
  return new Promise((resolve, reject) => {
    // Call DynamoDB to retrieve the selected table descriptions
    documentDynamoClient.describeTable(params, function (err, data) {
      if (err) {
        console.error(`Database describe ${TABLE_NAME} table failed, ${err}`);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
module.exports = {
  saveFailedSurvey,
  updateSurveyToSucceedState,
  getSurveyById,
  dbHealthCheck,
};
