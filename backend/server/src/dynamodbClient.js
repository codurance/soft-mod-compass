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

module.exports = { documentDynamoClient };
