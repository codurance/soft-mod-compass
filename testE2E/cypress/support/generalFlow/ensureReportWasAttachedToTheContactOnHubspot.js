const COMPASS_TEST_CONTACT_VID = 8102001;

const hubspotGet = (path, queryStringAsObject) => {
  return cy.request({
    url: `https://api.hubapi.com` + path,
    qs: { ...queryStringAsObject, hapikey: Cypress.env('hubspotAuthToken') },
    json: true,
  });
};

const findEngagementCreatedByCompass = (results) => {
  const resultIsAssociatedWithCompassTestContact = (result) =>
    result.associations.contactIds[0] === COMPASS_TEST_CONTACT_VID;

  const resultIsACompassNote = (result) =>
    result.engagement.bodyPreview &&
    result.engagement.bodyPreview.includes('Compass Report');

  const resultsAssociatedWithCompassTestContact = results.filter(
    resultIsAssociatedWithCompassTestContact
  );
  if (resultsAssociatedWithCompassTestContact.length === 0) {
    throw new Error(
      'No engagement was associated with the Compass Test Contact.\n\n' +
        "Did you maybe delete the 'compass-test@codurance.com' contact in Hubspot?\n" +
        'If so just update the contact VID at the top of the file'
    );
  }
  const engagementCreatedByCompass = resultsAssociatedWithCompassTestContact.find(
    resultIsACompassNote
  );

  if (!engagementCreatedByCompass) {
    throw new Error(
      "Couldn't find an engagment created by Compass in the last 5 minutes."
    );
  }

  return engagementCreatedByCompass;
};

const expectEngagement = (engagement) => ({
  toHaveAttachement() {
    const isNumber = (thing) => !isNaN(thing);

    const hasAttachement =
      engagement.attachments.length == 1 &&
      engagement.attachments[0].id &&
      isNumber(engagement.attachments[0].id);

    if (!hasAttachement)
      throw new Error('Engagement does not have an attachement');
  },
});

const fiveMinutesAgoTimestamp = () => Date.now() - 5 * 60 * 1000;

function ensureReportWasAttachedToTheContactOnHubspot() {
  hubspotGet(`/engagements/v1/engagements/recent/modified`, {
    since: fiveMinutesAgoTimestamp(),
  })
    .then((resp) => resp.body.results)
    .then(findEngagementCreatedByCompass)
    .then((engagementCreatedByCompass) => {
      expectEngagement(engagementCreatedByCompass).toHaveAttachement();
    });
}

module.exports = ensureReportWasAttachedToTheContactOnHubspot;
