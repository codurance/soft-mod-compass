const AWS = require('aws-sdk');
const { localMode, dynamoDBMockEndpoint } = require('./config');

AWS.config.update(
  localMode || dynamoDBMockEndpoint
    ? {
        convertEmptyValues: true,
        ...{
          endpoint: dynamoDBMockEndpoint,
          sslEnabled: false,
          region: 'local',
        },
      }
    : {
        region: 'eu-west-3',
        // accessKeyId: process.env.accessKeyId,
        // secretAccessKey: process.env.secretAccessKey,
      }
);

const documentDynamoClient = new AWS.DynamoDB.DocumentClient();
const dynamoClient = new AWS.DynamoDB();

function dbHealthCheck(tableName) {
  const params = {
    TableName: tableName,
  };
  // Call DynamoDB to retrieve the selected table descriptions
  return dynamoClient
    .describeTable(params)
    .promise()
    .catch((reason) => {
      console.error(`Database describe ${TABLE_NAME} table failed, ${reason}`);
      throw reason;
    });
}

module.exports = { documentDynamoClient, dbHealthCheck };
