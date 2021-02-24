const AWS = require('aws-sdk');
const { localMode, dynamoDBMockEndpoint } = require('./config');

AWS.config.update(getAwsSdkConfig());

const documentDynamoClient = new AWS.DynamoDB.DocumentClient();
const dynamoClient = new AWS.DynamoDB();

if (localMode) {
  dynamoClient
    .createTable({
      TableName: `Surveys`,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    })
    .promise()
    .catch((reason) => console.error('error initialising local db ', reason));
}

function dbHealthCheck(tableName) {
  const params = {
    TableName: tableName,
  };
  // Call DynamoDB to retrieve the selected table descriptions
  return dynamoClient
    .describeTable(params)
    .promise()
    .catch((reason) => {
      console.error(`Database describe ${tableName} table failed, ${reason}`);
      throw reason;
    });
}
function getAwsSdkConfig() {
  const localConf = {
    endpoint: 'http://localhost:8001',
    region: 'local',
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  };
  const testConf = {
    convertEmptyValues: true,
    ...{
      endpoint: dynamoDBMockEndpoint,
      sslEnabled: false,
      region: 'local',
    },
  };
  const conf = { region: 'eu-west-3' };

  if (localMode) return localConf;
  if (dynamoDBMockEndpoint) return testConf;
  return conf;
}

module.exports = { documentDynamoClient, dbHealthCheck };
