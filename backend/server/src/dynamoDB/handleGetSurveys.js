const { dynamoClient } = require('./dynamodbClient');

var params = {
  ExpressionAttributeValues: {
    ':a': {
      S: 'initialize',
    },
  },
  FilterExpression: 'surveyState = :a',
  TableName: 'Surveys',
};

module.exports = async () => {
  dynamoClient.scan(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      console.log('************************************', data);
    }
  });
};
