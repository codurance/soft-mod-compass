const fetch = require("node-fetch");

function getHubspotUserDetails(uuid) {
  const authorisation = process.env.HUBSPOT_AUTH_TOKEN;
  const formId = process.env.HUBSPOT_FORM_ID;
  const endpoint = `https://api.hubapi.com/form-integrations/v1/submissions/forms/${formId}?hapikey=${authorisation}`;

  const userData = fetch(endpoint)
    .then(response => response.json())
    .then(jsonData => jsonData.results.filter(entry => entry.values.find( ({value}) => value === uuid )))
    .catch(error => console.error(error));

    return Object.assign({}, userData[0]);
}

module.exports = getHubspotUserDetails;