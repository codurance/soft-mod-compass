const { documentDynamoClient } = require('./dynamodbClient');

module.exports = async (id) => {
  const params = {
    TableName: 'Surveys',
    Key: {
      id,
    },
  };
  const { Item } = await documentDynamoClient.get(params).promise();
  return Item;
};
