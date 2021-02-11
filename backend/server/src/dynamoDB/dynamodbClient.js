const AWS = require('aws-sdk');
const dynamoDbTestClient = require('../mockData/DynamoDbTestClient');
const isTest = process.env.JEST_WORKER_ID;
AWS.config.update({
  region: 'eu-west-3',
  // accessKeyId: process.env.accessKeyId,
  // secretAccessKey: process.env.secretAccessKey,
});

const dynamoClient = new AWS.DynamoDB();
const documentDynamoClient = isTest
  ? dynamoDbTestClient
  : new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoClient, documentDynamoClient };
