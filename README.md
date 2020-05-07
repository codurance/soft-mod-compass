# Codurance Compass

A survey for checking the level of practices at your company.


## User flow

### In picture

![compass sequence diagram](/docs/compass-sequence-diagram.png?raw=true)

The above diagram in the `docs` folder can be opened with [draw.io](https://www.draw.io/).


### TypeForm

TypeForm is used to build and deliver the survey itself. It is a paid service and we have a subscription for the PRO+ tier. Login credentials can be found on the wiki. TypeForm has support for hidden fields and every user who takes the survey is issued with a UUID that we provide when the form is created.

When a user completes the survey the UUID from the hidden field is saved along with their answers. We then use the UUID to query the TypeForm Responses API for a specific user's answers. We use the answers to calculate scores which are fed into various charts using [chartjs](https://www.chartjs.org/) and the report.

The UUID is also passed along in the query string when we redirect the user to HubSpot so that we can uniquely identify them.

#### Question categories

Unfortunatley TypeForm has no concept of categories, giving this the questions are grouped into categories in the Node app. A category consists of 4 questions, with each of those questions relating to a subcategory within the parent category. For example:

Questions 1 - 4 relate to the category `Organisational Maturity`, which encompasses:

Q1: question regarding `DevSecOps`

Q2: question regarding `Delivering Value`

Q3: question regarding `Technical Debt`

Q4: question regarding `Well Defined Methodology`

Questions 5 - 8: relate to the category `Continuous Delivery`

... etc

There are 20 questions in total, covering 5 categories with 4 questions in each.

You can find the information for categories in `src/server/report/categoryData.js`.

### HubSpot

HubSpot is a CRM service used to host the landing page that captures user contact information once they have downloaded their report. After a user has completed the survey they are redirected to HubSpot with their UUID and a base64 comma separated list of scores for each survey category in the query string. We use the UUID to build a report download URL that points back to the `/report/:UUID` endpoint of the Node app. Note we also store the UUID in a hidden field on the HubSpot report download form, this is then saved along with their interaction so that we can refer back to their scores or report.

HubSpot provides tokens (`{{request.query_dict.XXX}}`) that can be embedded into any input field or script that are replaced with query string parameters when the form is rendered:

Scores that generate the radial chart: `atob("{{request.query_dict.scores}}").split(',')` in `src/hubspot/assets/footer.html`

Redirect URL to download the report: `http://codurance-compass.eu-west-1.elasticbeanstalk.com/report/{{request.query_dict.uuid}}/Codurance%20Compass.pdf` in `src/hubspot/assets/compassLandingPage.json`

### Reporting (jsreport)

The `/report/:UUID` endpoint of the Node app uses the UUID to query the TypeForm Responses API to retrieve the user's answers, generate their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file download.

The jsreport console can be found at `/reporting`. This is where you will find the jsreport development environment for updating the report template.

## Running the project
### NOTES - TO REMOVE
WIP TODO (do not work yet):

    "create-env-prod:en": # Tip: Use EnvTag: "prod-en"
    "create-env-prod:es": # Tip: Use EnvTag: "prod-es"

    "destroy-env-prod:en": # Tip: Use EnvTag: "prod-en"
    "destroy-env-prod:es": # Tip: Use EnvTag: "prod-es"

    "deploy-prod:en": # Tip: Use EnvTag: "prod-en"
    "deploy–prod:es": # Tip: Use EnvTag: "prod-en"

### Config
Environment variables needed for this project can be found in Bitwarden:

- **Dev**
  -  `[Compass] envvars-config-dev-EN.sh` contains the English values used on dev
  -  `[Compass] envvars-config-dev-ES.sh` contains the Spanish values used on dev

- **Prod**
  - WIP TODO: Do not use yet, wasn't tested.
  -  `[Compass] envvars-config-prod-EN.sh` contains the English values used on production
  -  `[Compass] envvars-config-prod-ES.sh` contains the Spanish values used on production

Create the file in the `scripts` directory, paste the contents from Bitwarden.

### Running Locally

TODO: 
**Note** AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are only needed for running a local environment. These are not needed for AWS deployment.

Run the dev environment:

```
# Step 1
# Copy the correct config (See 'Config' section)

# Step 2
yarn install

# Step 3
yarn dev # go to localhost:8080
```

:large_blue_diamond: Note that `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

#### Running tests locally

```
yarn test
```

### Running Locally - with Docker - TO UPDATE

Before building the docker container you'll need to run `yarn install` to update the yarn.lock which is then used when building the docker image.

You then need to grab the contents of the `scripts/docker/default-env.sh` note within Bitwarden, and place it in the `scripts/docker/` location within a file called `default-env.sh`. This is a copy of the environment variables from the `default-env.sh` file which is required to run locally - but formatted to be used within Docker.

You can now build the docker container using the command below.

```
yarn build:docker
```

and to access `Codurance Compass` going through http://localhost:8080

```
yarn run:docker
```

To stop the container you'll need to get the container id using `docker ps` and you should get a similar output as per below

```
codurance-compass git:(Update-pdf-design) ✗ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
86533ed26329        3659ae504815        "docker-entrypoint.s…"   2 hours ago         Up 2 hours          8080/tcp            xenodochial_joliot
```

Then you grab the container id and run the command below

```
codurance-compass git:(Update-pdf-design) ✗ docker stop 86533ed26329
86533ed26329
```

### Running tests locally -  with Docker

```
./scripts/docker/run-tests.sh
```

## Deploying the Project - AWS

### Playground

> **Note:** In all following commands, the language `en` can be swapped for `es`.

Create a dev environment called `compass-dev-en` on AWS (with roles, bucket, EBS, etc.):

```sh

yarn create-env-dev:en

```
Deploy current (checked-out) branch to `compass-dev-en`

```sh

yarn deploy-env-dev:en

```

**Clean Up:** Destroy `compass-dev-en` (and all corresponding resources):

```sh

yarn destroy-env-dev:en

```

### Production (DOES NOT WORK YET => To update)

Commands to create, deploy, and destroy the English production environment:
```sh 
yarn deploy-prod:en

yarn create-prod-env:en

yarn destroy-prod-env:en
```
Commands to create, deploy, and destroy the Spanish production environment:
```sh
yarn deploy-prod:es

yarn create-prod-env:es

yarn destroy-prod-env:es
```

### HTTPS

The elasticbeanstalk instance will redirect HTTP traffic to HTTPS.
When creating a new enviromnent, you need to manually add an HTTPS listener with a valid certificate.


## Useful links for testing (deprecated TO UPDATE)

### UUID
The uuid is generated when we start answering TypeForm questions.
It is used to store the answers on TypeForm and also user details on HubSpot

In order to avoid answering every time, we can reuse this UUID: c8dfdc09-dd9b-4d35-a80e-b14c79598eb5

### Links

Examples below are using an existing UUID.
You'll be able to download the PDF but you may not receive the mail.
If you want the mail, you need to fill the [HubSpot form](https://info.codurance.com/compass-test-0?uuid=c8dfdc09-dd9b-4d35-a80e-b14c79598eb5&scores=MTAwLDEwMCwxMDAsMTAwLDEwMA==)
Doing so will **override** the previous email associated to the UUID.

- Redirect link that HubSpot will use (mail + download button)
  - http://compass-env.eba-cggvmdz7.eu-central-1.elasticbeanstalk.com/report/submit/c8dfdc09-dd9b-4d35-a80e-b14c79598eb5
  - http://localhost:8080/report/submit/c8dfdc09-dd9b-4d35-a80e-b14c79598eb5

- HubSpot form (will override the email associated to this UUID)
  - https://info.codurance.com/compass-test-0?uuid=c8dfdc09-dd9b-4d35-a80e-b14c79598eb5&scores=MTAwLDEwMCwxMDAsMTAwLDEwMA==

## Additional Notes
HubSpot landing page deployment with Docker has been deprecated.
Check [this commit](https://github.com/codurance/soft-mod-compass/commit/8adc74e0e3fb9aefbc49ef6f3ed580e39d260964)
