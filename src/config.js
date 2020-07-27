const socialMediaPreview = require('./server/socialMediaPreview');
const config = require('./server/config');

module.exports = {
  devEn: {
    filename: 'compass-survey-dev-en.html',
    typeformFormId: 'j0ytULD0',
    hubspotFormUrl:
      'https://info.codurance.com/en/dev-compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    canonicalUrl: config.canonicalUrl,
  },
  devEs: {
    filename: 'compass-survey-dev-es.html',
    typeformFormId: 'AQRUSE',
    hubspotFormUrl:
      'https://info.codurance.com/es/dev-compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    canonicalUrl: config.canonicalUrl,
  },
  prodEn: {
    filename: 'compass-survey-prod-en.html',
    typeformFormId: 'gF83u4IR',
    hubspotFormUrl: 'https://info.codurance.com/en/compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    canonicalUrl: config.canonicalUrl,
  },
  prodEs: {
    filename: 'compass-survey-prod-es.html',
    typeformFormId: 'ZoBrCZ',
    hubspotFormUrl: 'https://info.codurance.com/es/compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    canonicalUrl: config.canonicalUrl,
  },
};
