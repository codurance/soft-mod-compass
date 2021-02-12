const { documentDynamoClient } = require('./dynamodbClient');
const generateUuid = require('uuid/v4');

const buildParams = (survey) => ({
  TableName: 'Surveys',
  Item: survey,
});

module.exports = {
  saveFailedSurvey: async (survey) => {
    const id = generateUuid();
    const params = buildParams({
      bodyRequest: survey,
      id,
      surveyState: 'failed',
    });

    documentDynamoClient.put(params, function (err, data) {
      if (err) console.log(err, err.stack);
    });
    return id;
  },
};
