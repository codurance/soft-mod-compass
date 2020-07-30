const ENGLISH_PREVIEW_TEXT =
  'Our software delivery assessment measures the ' +
  'current level of maturity of your software development organisation across ' +
  '5 areas & includes recommendations for improvements.';
const SPANISH_PREVIEW_TEXT =
  'Nuestra evaluación de entrega de software permite medir' +
  ' el nivel actual de madurez de tu organización de desarrollo de software en ' +
  'cinco áreas distintas e incluye recomendaciones para aplicar posibles mejoras.';
const ENGLISH_TITLE = 'Compass by Codurance | Assessment Tool';
const SPANISH_TITLE = 'Compass by Codurance | Herramienta de evaluación';

module.exports = {
  devEn: {
    filename: 'compass-survey-dev-en.html',
    typeformFormId: 'j0ytULD0',
    hubspotFormUrl:
      'https://info.codurance.com/en/dev-compass-details-submission',
    description: ENGLISH_PREVIEW_TEXT,
    title: ENGLISH_TITLE,
    canonicalUrl: 'https://compass.codurance.com',
  },
  devEs: {
    filename: 'compass-survey-dev-es.html',
    typeformFormId: 'AQRUSE',
    hubspotFormUrl:
      'https://info.codurance.com/es/dev-compass-details-submission',
    description: SPANISH_PREVIEW_TEXT,
    title: SPANISH_TITLE,
    canonicalUrl: 'https://compass.codurance.es',
  },
  prodEn: {
    filename: 'compass-survey-prod-en.html',
    typeformFormId: 'gF83u4IR',
    hubspotFormUrl: 'https://info.codurance.com/en/compass-details-submission',
    description: ENGLISH_PREVIEW_TEXT,
    title: ENGLISH_TITLE,
    canonicalUrl: 'https://compass.codurance.com',
  },
  prodEs: {
    filename: 'compass-survey-prod-es.html',
    typeformFormId: 'ZoBrCZ',
    hubspotFormUrl: 'https://info.codurance.com/es/compass-details-submission',
    description: SPANISH_PREVIEW_TEXT,
    title: SPANISH_TITLE,
    canonicalUrl: 'https://compass.codurance.es',
  },
};
