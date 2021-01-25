import languageService from './languageService';

export default {
  redirect() {
    const language = languageService.getLanguage();
    window.location = `https://info.codurance.com/${language}/compass-successful-submission`;
  },
};
