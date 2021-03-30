export default {
  getCookie(cookieKey) {
    const cookiesArray = document.cookie.split('; ');
    const chosenCookie = cookiesArray.find((cookie) =>
      cookie.includes(cookieKey)
    );

    if (chosenCookie === undefined) {
      // eslint-disable-next-line no-console
      console.error(`Unable to find chosen cookie ${cookieKey}`);
    }

    const chosenCookieValue = chosenCookie.substr(
      chosenCookie.indexOf('=') + 1,
      chosenCookie.length
    );
    return chosenCookieValue;
  },
};
