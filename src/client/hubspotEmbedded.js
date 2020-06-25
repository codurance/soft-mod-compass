function hubspotFactory(cookieMessage) {
  const initializeHubspot = () => {
    let hasConsent = cookieMessage.hasConsent();
    // TODO: See if onConsent can run automatically if already got consent
    if (hasConsent) {
      loadHubspotEmbeddedCode();
    } else {
      cookieMessage.onConsent(function () {
        loadHubspotEmbeddedCode();
      });
    }
  };

  const loadHubspotEmbeddedCode = function () {
    const scriptTag = document.createElement('script');
    scriptTag.src = '//js.hs-scripts.com/3042464.js';
    scriptTag.setAttribute('id', 'hs-script-loader');
    document.body.appendChild(scriptTag);
  };

  return { initializeHubspot };
}

module.exports = hubspotFactory;
