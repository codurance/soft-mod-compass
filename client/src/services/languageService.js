export default {
  getLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('lang');
    return language === 'es' ? 'es' : 'en';
  },

  getTitle() {
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('lang');
    const title = 'Compass by Codurance |';

    return language === 'es'
      ? `${title} Herramienta de evaluación`
      : `${title} Assessment Tool`;
  },
};
