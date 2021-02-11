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

  dynamoClient.scan(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      console.log('************************************', data);
    }
  });
};
