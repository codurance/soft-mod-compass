# Codurance Compass

A survey for checking the level of practices at your company.

## Integrations

### TypeForm

TypeForm is used to build and deliver the survey itself. It is a paid service and we have a subscription for the PRO+ tier. Login credentials can be found on the wiki. TypeForm has support for hidden fields and every user who takes the survey is issued with a UUID that we provide when the form is created. 

When a user completes the survey the UUID from the hidden field is saved along with their answers. We then use the UUID to query the TypeForm Responses API for a specific user's answers. We use the answers to calculate scores which are fed into various charts using [chartjs](https://www.chartjs.org/) and the report.

The UUID is also passed along in the query string when we redirect the user to HubSpot so that we can uniquely identify them.

### HubSpot

HubSpot is a CRM service used to host the landing page that captures user contact information once they have downloaded their report. After a user has completed the survey they are redirected to HubSpot with their UUID and a base64 comma separated list of scores for each survey category in the query string. We use the UUID to build a report download URL that points back to the `/report/:UUID` endpoint of the Node app. Note we also store the UUID in a hidden field on the HubSpot report download form, this is then saved along with their interaction so that we can refer back to their scores or report.

HubSpot provides tokens (`{{request.query_dict.XXX}}`) that can be embedded into any input field or script that are replaced with query string parameters when the form is rendered:

Scores that generate the radial chart: `atob("{{request.query_dict.scores}}").split(',')` in `src/hubspot/assets/footer.html`

Redirect URL to download the report: `http://codurance-compass.eu-west-1.elasticbeanstalk.com/report/{{request.query_dict.uuid}}` in `src/hubspot/assets/compassLandingPage.json`

### Reporting (jsreport)

The `/report/:UUID` endpoint of the Node app uses the UUID to query the TypeForm Responses API to retrieve the user's answers, generate their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file download.

The jsreport console can be found at `/reporting`. This is where you will find the jsreport development environment for updating the report template.

## User Journey

![compass sequence diagram](/docs/compass-sequence-diagram.png?raw=true)

The above diagram in the `docs` folder can be opened with [draw.io](https://www.draw.io/).

## Running locally

:large_blue_diamond: Note that `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

```
yarn install

yarn start # go to localhost:8080
```

## Running with Docker

```
docker build -t codurance-compass .
docker run codurance-compass
```

## Testing locally

```
yarn test
```

## Testing with Docker

```
./scripts/docker/run-tests.sh
```

## HubSpot landing page deployment with Docker

For an explanation of how HubSpot is leveraged in the solution see the _integrations_ section above.

```
./scripts/docker/deploy-hubspot.sh
```

## Continuous Delivery

The pipeline for this project lives in AWS CodePipeline.

The current URL for the deployed version is http://codurance-compass.eu-west-1.elasticbeanstalk.com/

