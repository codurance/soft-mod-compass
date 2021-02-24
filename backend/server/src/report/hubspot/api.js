const config = require('../../config');
const request = require('request-promise');
const fs = require('fs');
const path = require('path');

const hubspotPost = (baseUrl, path, { formData, body }) => {
  const requestOptions = {
    method: 'POST',
    uri: baseUrl + path,
    json: true,
  };

  if (formData) requestOptions.formData = formData;
  if (body) requestOptions.body = body;

  return {
    execute: async () => {
      requestOptions.qs = { hapikey: config.hubspot.authToken };
      return request(requestOptions);
    },
    executeWithoutQueryString: async () => request(requestOptions),
  };
};

function generatePdfStream(pdfBuffer, pdfName) {
  const pdfPath = path.join(__dirname, `./${pdfName}`);

  fs.writeFileSync(pdfPath, pdfBuffer, (err) =>
    console.log('Error generating the PDF ', err.message)
  );

  return fs.createReadStream(pdfPath);
}

const uploadFile = (
  fileBufer,
  fileName,
  fileMimeType,
  pathOnHubspotFilemanager
) => {
  const extractUploadedFileId = (resp) => resp['objects'][0]['s3_url'];

  var fileOptions = {
    access: 'PUBLIC_INDEXABLE',
    ttl: 'P3M',
    overwrite: false,
    duplicateValidationStrategy: 'NONE',
    duplicateValidationScope: 'ENTIRE_PORTAL',
  };

  return hubspotPost(
    config.hubspot.fileApiUrl,
    `/filemanager/api/v3/files/upload`,
    {
      formData: {
        file: generatePdfStream(fileBufer, fileName),
        options: JSON.stringify(fileOptions),
        folderPath: pathOnHubspotFilemanager,
      },
    }
  )
    .execute()
    .then(extractUploadedFileId)
    .catch((e) => {
      console.log('error uploading hubspot file ', e);
      throw new Error(`Could not upload file - Reason: ${e.message}`);
    })
    .finally(() => {
      const pdfPath = path.join(__dirname, `./${fileName}`);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    });
};

const submitForm = (pdfLink, user, scores) => {
  return hubspotPost(
    config.hubspot.formApiUrl,
    `/submissions/v3/integration/submit/${config.hubspot.portalId}/${config.hubspot.formId}`,
    {
      body: {
        fields: [
          {
            name: 'email',
            value: user.email,
          },
          {
            name: 'firstname',
            value: user.firstName,
          },
          {
            name: 'lastname',
            value: user.lastName,
          },
          {
            name: 'company',
            value: user.company,
          },
          {
            name: 'compass_language',
            value: user.language,
          },
          {
            name: 'report',
            value: pdfLink,
          },
          {
            name: 'job_function',
            value: user.jobFunction,
          },
          ...scores,
        ],
        legalConsentOptions: {
          legitimateInterest: {
            value: true,
            subscriptionTypeId: 4603721,
            legalBasis: 'CUSTOMER',
            text:
              'Codurance needs the contact information you provide to us to contact you about our products and services. As responsible for the treatment, Codurance has the necessary technical, organizational and human resources to guarantee the security and protection of its information systems, as well as the data and information stored in them. Your personal data will be treated to comply with both the legal obligations that are applicable, as well as the rights and obligations contained in the contracts you may have with us as well as the services you require. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.',
          },
        },
        context: {
          ipAddress: user.ip,
        },
      },
    }
  )
    .executeWithoutQueryString()
    .then((value) => ({ userCreated: user.email }))
    .catch((e) => {
      console.log('error submitting hubspot form ', e);
      throw new Error(`Could not submit form - Reason: ${e.message}`);
    });
};

module.exports = {
  uploadFile,
  submitForm,
};
