ready(hubspotInit);

function hubspotInit() {
  let hasConsent = compass.cookieMessage.hasConsent();
  if (hasConsent) {
    loadHubspotEmbedCode();
  } else {
    compass.cookieMessage.onConsent(function () {
      loadHubspotEmbedCode();
    });
  }
}

const loadHubspotEmbedCode = function () {
  const scriptTag = document.createElement('script');
  scriptTag.src = '//js.hs-scripts.com/3042464.js';
  scriptTag.setAttribute('id', 'hs-script-loader');
  document.body.appendChild(scriptTag);
};
