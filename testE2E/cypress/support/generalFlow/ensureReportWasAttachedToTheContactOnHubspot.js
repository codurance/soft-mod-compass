const COMPASS_TEST_CONTACT_VID = 7680701;

const hubspotGet = (path, queryStringAsObject) => {
  return cy.request({
    url: `https://api.hubapi.com` + path,
    qs: { ...queryStringAsObject, hapikey: Cypress.env('hubspotAuthToken') },
    json: true,
  });
};

const findEngagementCreatedByCompass = (results) => {
  const engagementCreateByCompass = results.find((result) => {
    const isAssociatedWithCompassTestContact =
      result.associations.contactIds[0] === COMPASS_TEST_CONTACT_VID;
    const isCompassNote =
      result.engagement.bodyPreview &&
      result.engagement.bodyPreview.includes('Compass Report');

    return isAssociatedWithCompassTestContact && isCompassNote;
  });

  if (!engagementCreateByCompass) {
    throw new Error(
      "Couldn't find an engagment created by Compass in the last 5 minutes"
    );
  }

  return engagementCreateByCompass;
};

const expectEngagement = (engagement) => ({
  toHaveAttachement: function () {
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
