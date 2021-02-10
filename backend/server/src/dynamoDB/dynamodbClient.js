var AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-3',
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

var dynamoClient = new AWS.DynamoDB();

module.exports = { dynamoClient };
