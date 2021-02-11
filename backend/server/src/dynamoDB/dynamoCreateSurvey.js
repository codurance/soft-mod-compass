const { documentDynamoClient } = require('./dynamodbClient');
const generateUuid = require('uuid/v4');

const buildParams = (survey) => ({
  TableName: 'Surveys',
  Item: survey,
});

const buildSurveyDAO = (survey) => {
  const id = generateUuid();
  const surveyState = 'initialize';
  return { ...survey, id, surveyState };
};

module.exports = async (survey) => {
  const surveyDTO = buildSurveyDAO(survey);
  const params = buildParams(surveyDTO);

  documentDynamoClient.put(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};
