export default {
  getLanguage() {
    const { pathname } = window.location;
    return pathname === '/es' ? 'es' : 'en';
  },
};
