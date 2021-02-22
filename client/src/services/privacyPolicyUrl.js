import languageService from './languageService';

const privacyPolicyUrl = () => {
  const language = languageService.getLanguage();
  return language === 'es'
    ? `https://www.codurance.com/es/policies/privacy/`
    : `https://www.codurance.com/policies/privacy/`;
};

export default privacyPolicyUrl;
