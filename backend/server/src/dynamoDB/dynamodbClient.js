const AWS = require('aws-sdk');
const isTest = process.env.MOCK_DYNAMODB_ENDPOINT;

AWS.config.update(
  isTest
    ? {
        convertEmptyValues: true,
        ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
          endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
          sslEnabled: false,
          region: 'local',
        }),
      }
    : {
        region: 'eu-west-3',
        // accessKeyId: process.env.accessKeyId,
        // secretAccessKey: process.env.secretAccessKey,
      }
);

const dynamoClient = new AWS.DynamoDB();
const documentDynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoClient, documentDynamoClient };
