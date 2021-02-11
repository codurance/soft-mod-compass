const { documentDynamoClient } = require('./dynamodbClient');

var params = {
  TableName: 'Surveys',
  Key: { id: 'abc' },
  UpdateExpression: 'set surveyState = :surveyState',
  ExpressionAttributeValues: {
    ':surveyState': 'finalize',
  },
  ReturnValues: 'UPDATED_NEW',
};

module.exports = async () => {
  console.log('chego');
  documentDynamoClient.update(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};
