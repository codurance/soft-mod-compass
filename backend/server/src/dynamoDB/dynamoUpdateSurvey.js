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

module.exports = {
  updateToSucceedState: async (id) => {
    const params = buildParams(id, 'succeed');
    documentDynamoClient.update(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  },
};
