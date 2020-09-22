const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });

const sqs = new AWS.SQS();

function listQueues() {
  sqs
    .listQueues()
    .promise()
    .then((data) => {
      console.log(data.QueueUrls);
    });
}

const queueURL =
  'https://sqs.eu-west-1.amazonaws.com/300563897675/compass-pipedream';

const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 20,
};

sqs
  .receiveMessage(params)
  .promise()
  .then((data) => {
    if (data.Messages) {
      console.log(data.Messages);
      for (const msg of data.Messages) {
        const msgBody = JSON.parse(msg.Body);
        console.log(msgBody);
      }
    }
  })
  .catch((err) => console.log('Receive Error', err));
