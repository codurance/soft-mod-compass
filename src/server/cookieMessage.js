const config = require('./config');

const cookieMessageEn = {
  text:
    'Codurance uses cookies to ensure we give you the best experience on our website.',
  viewPolicy: 'View our Cookie Policy',
  accept: 'Accept',
  policyLink: 'https://codurance.com/policies/cookie/',
};
const cookieMessageEs = {
  text:
    'Codurance utiliza cookies para garantizarte la mejor experiencia de navegación en nuestro sitio web.',
  viewPolicy: 'Ver nuestra Política de Cookies',
  accept: 'Aceptar',
  policyLink: 'https://codurance.es/policies/cookie/',
};

let cookieMessage = config.isESVersion ? cookieMessageEs : cookieMessageEn;
module.exports = cookieMessage;
