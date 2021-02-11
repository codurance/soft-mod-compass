const { dynamoClient } = require('./dynamodbClient');

const buildParams = (surveyState) => ({
  ExpressionAttributeValues: {
    ':a': {
      S: surveyState,
    },
  },
  FilterExpression: 'surveyState = :a',
  TableName: 'Surveys',
});

module.exports = async (surveyState) => {
  const params = buildParams(surveyState);
  return await dynamoClient.scan(params).promise();
};
