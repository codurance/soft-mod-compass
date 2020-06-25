// see http://www.quirksmode.org/js/cookies.html
function createCookie(name, value, days, path) {
  let expires;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else expires = '';
  document.cookie = name + '=' + value + expires + '; path=' + path;
}

// see: http://www.quirksmode.org/js/cookies.html
function readCookie(name) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function cookieMessage() {
  const COOKIE_NAME = 'has-cookie-consent';
  let messageElement = document.getElementsByClassName('cookie-message')[0];
  let acceptButton = document.getElementsByClassName(
    'cookie-message__button'
  )[0];
  if (!messageElement) {
    throw 'no element found for cookie message';
  }
  if (!acceptButton) {
    throw 'no element found for cookie message accept';
  }
  let onConsentCallbacks = [];

  function showMessage() {
    messageElement.style.visibility = 'visible';
  }

  function hideMessage() {
    messageElement.style.visibility = 'hidden';
    messageElement.style.display = 'none';
  }

  function hasConsent() {
    let cookie = readCookie('has-cookie-consent');
    let hasConsent = cookie != null && cookie == 'yes';
    return hasConsent;
  }

  function setConsent() {
    // Set/update cookie
    let cookieExpiry = 60;
    let cookiePath = '/';
    createCookie(COOKIE_NAME, 'yes', cookieExpiry, cookiePath);
  }

  function onConsent(callback) {
    if (hasConsent()) {
      callback();
    } else {
      onConsentCallbacks.push(callback);
    }
  }

  function triggerOnConsent() {
    onConsentCallbacks.forEach(function (callback) {
      callback.call(null);
    });
  }

  function init() {
    if (hasConsent()) {
      hideMessage();
      return;
    }
    showMessage();
    acceptButton.addEventListener('click', function () {
      setConsent();
      hideMessage();
      triggerOnConsent();
    });
  }

  init();
  return {
    hasConsent: hasConsent,
    onConsent: onConsent,
  };
}

module.exports = cookieMessage;
