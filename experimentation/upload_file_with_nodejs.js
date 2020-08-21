const request = require('request-promise');
const fs = require('fs');

function uploadReport(reportStream) {
  const options = {
    method: 'POST',
    uri: 'http://5968187b6f2a38081989c8216ddf1dae.m.pipedream.net',
    formData: {
      name: 'files',
      file: {
        value: reportStream,
        options: {
          contentType: 'application/pdf',
        },
      },
    },
  };

  request(options)
    .then(function (body) {
      console.log(body);
    })
    .catch(function (err) {
      console.log(err);
    });
}

const reportStream = fs.createReadStream('./report.pdf');
uploadReport(reportStream);
