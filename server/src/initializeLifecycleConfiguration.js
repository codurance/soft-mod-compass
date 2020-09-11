const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const config = require('./config');

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
            Days: config.aws.reportExpirationDays,
          },
          ID: 'DeleteAfterXDays',
        },
      ],
    },
  };

  return s3
    .putBucketLifecycleConfiguration(params)
    .promise()
    .then((_) =>
      console.log('Initialization of Lifecycle Configuration successful!')
    )
    .catch((error) => {
      console.log('Initialization of Lifecycle Configuration failed!');
      console.log(error);
    });
}

module.exports = initializeLifecycleConfiguration;
