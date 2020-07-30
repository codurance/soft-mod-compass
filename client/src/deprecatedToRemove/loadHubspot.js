const loadHubspotEmbeddedCode = function () {
  const scriptTag = document.createElement('script');
  scriptTag.src = '//js.hs-scripts.com/3042464.js';
  scriptTag.setAttribute('id', 'hs-script-loader');
  document.body.appendChild(scriptTag);
};

module.exports = loadHubspotEmbeddedCode;
