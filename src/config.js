const socialMediaPreview = require('./server/socialMediaPreview');
const config = require('./server/config');
const hubspotRequiredStandardHeaderIncludesTag = `{{standard_header_includes}}`;
const hubspotRequiredStandardFooterIncludesTag = `{{standard_footer_includes}}`;

module.exports = {
  devEn: {
    filename: 'compass-survey-dev-en.html',
    typeformFormId: 'j0ytULD0',
    hubspotFormUrl:
      'https://info.codurance.com/en/dev-compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    header: hubspotRequiredStandardHeaderIncludesTag,
    footer: hubspotRequiredStandardFooterIncludesTag,
    canonicalUrl: config.canonicalUrl,
  },
  devEs: {
    filename: 'compass-survey-dev-es.html',
    typeformFormId: 'AQRUSE',
    hubspotFormUrl:
      'https://info.codurance.com/es/dev-compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    header: hubspotRequiredStandardHeaderIncludesTag,
    footer: hubspotRequiredStandardFooterIncludesTag,
    canonicalUrl: config.canonicalUrl,
  },
  prodEn: {
    filename: 'compass-survey-prod-en.html',
    typeformFormId: 'gF83u4IR',
    hubspotFormUrl: 'https://info.codurance.com/en/compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    header: hubspotRequiredStandardHeaderIncludesTag,
    footer: hubspotRequiredStandardFooterIncludesTag,
    canonicalUrl: config.canonicalUrl,
  },
  prodEs: {
    filename: 'compass-survey-prod-es.html',
    typeformFormId: 'ZoBrCZ',
    hubspotFormUrl: 'https://info.codurance.com/es/compass-details-submission',
    description: socialMediaPreview.getDescription(),
    title: socialMediaPreview.getTitle(),
    header: hubspotRequiredStandardHeaderIncludesTag,
    footer: hubspotRequiredStandardFooterIncludesTag,
    canonicalUrl: config.canonicalUrl,
  },
};
