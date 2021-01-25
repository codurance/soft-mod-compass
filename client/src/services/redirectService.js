export default {
  redirect() {
    const { pathname } = window.location;
    const language = pathname === '/es' ? 'es' : 'en';
    window.location = `https://info.codurance.com/${language}/compass-successful-submission`;
  },
};
