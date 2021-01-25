export default {
  getLanguage() {
    const { pathname } = window.location;
    return pathname === '/es' ? 'es' : 'en';
  },

  getTitle() {
    const { pathname } = window.location;
    const title = 'Compass by Codurance |';

    return pathname === '/es'
      ? `${title} Herramienta de evaluación`
      : `${title} Assessment Tool`;
  },
};
