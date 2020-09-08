const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const config = require('../config');

function initializeLifecycleConfiguration() {
  const params = {
    Bucket: 'compass-dev-en',
    LifecycleConfiguration: {
      Rules: [
        {
          Filter: {
            Prefix: 'compass-report',
          },
          Status: 'Enabled',
          Expiration: {
            Days: config.aws.reportExpirationDate,
          },
          ID: 'DeleteAfterXDays',
        },
      ],
    },
  };

  return s3
    .putBucketLifecycleConfiguration(params)
    .promise()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

module.exports = initializeLifecycleConfiguration;
