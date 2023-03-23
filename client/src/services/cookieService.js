export default {
  documentCookies() {
    return document.cookie;
  },

  getCookie(cookieKey) {
    const cookiesArray = this.documentCookies().split('; ');
    const chosenCookie = cookiesArray.find((cookie) =>
      cookie.includes(cookieKey)
    );

    if (chosenCookie === undefined) {
      // eslint-disable-next-line no-console
      console.error(`Unable to find chosen cookie ${cookieKey}`);
      return null;
    }

    const chosenCookieValue = chosenCookie.slice(chosenCookie.indexOf('=') + 1);
    return chosenCookieValue;
  },
};
