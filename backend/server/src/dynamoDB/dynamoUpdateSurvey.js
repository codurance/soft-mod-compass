const { documentDynamoClient } = require('./dynamodbClient');

const buildParams = (surveyId, surveyState) => ({
  TableName: 'Surveys',
  Key: { id: surveyId },
  UpdateExpression: 'set surveyState = :surveyState',
  ExpressionAttributeValues: {
    ':surveyState': surveyState,
  },
  ReturnValues: 'UPDATED_NEW',
});

module.exports = async (id, surveyState) => {
  const params = buildParams(id, surveyState);
  documentDynamoClient.update(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};
