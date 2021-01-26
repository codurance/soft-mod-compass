const config = require('../../config');
const request = require('request-promise');

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

const hubspotGet = async (path) => {
  return request({
    uri: `https://api.hubapi.com` + path,
    qs: { hapikey: config.hubspot.authToken },
    json: true,
  });
};

const uploadFile = (
  fileBufer,
  fileName,
  fileMimeType,
  pathOnHubspotFilemanager
) => {
  const extractUploadedFileId = (resp) => resp['objects'][0]['s3_url'];

  return hubspotPost(config.hubspot.fileApiUrl, `/filemanager/api/v2/files`, {
    formData: {
      files: {
        value: fileBufer,
        options: {
          filename: fileName,
          contentType: fileMimeType,
        },
      },
      folder_path: pathOnHubspotFilemanager,
    },
  })
    .execute()
    .then(extractUploadedFileId)
    .catch((e) => {
      console.log('error submitting hubspot form ', e);
      throw new Error(`Could not upload file - Reason: ${e.message}`);
    });
};

const submitForm = (pdfLink, user) => {
  console.log(pdfLink, user);
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
