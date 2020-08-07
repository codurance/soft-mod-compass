# Codurance Compass

A survey for checking the level of practices at your company.

## User flow

### In picture

> Througout the whole flow, the client is identified by the `UUID` generated at the start.

![compass sequence diagram](docs/diagrams/out/compass-sequence-diagram-hs-flow/sequence-diagram.png?raw=true)

The above diagram in the `docs` folder is generated from the PlantUML file: `sequence-diagram.puml`.
To edit and generate png from plantUML files, check out this [VSCode extension](https://github.com/qjebbs/vscode-plantuml)

### TypeForm

TypeForm is used to build and deliver the survey itself. It is a paid service and we have a subscription for the PRO+ tier. Login credentials can be found on bitwarden.

When a user completes the survey the `UUID` from the hidden field is saved along with their answers. We then use the `UUID` to query the TypeForm Responses API for a specific user's answers. We use the answers to calculate scores that are used in the report.

The `UUID` is also passed along in the query string when we redirect the user to HubSpot so that we can uniquely identify them.

#### Passing the UUID
Typeform supports hidden fields, when loading the Typeform survey the `UUID` is passed as a hidden field. Then when the form is submitted this `UUID` will be stored along with the answers provided.  
See: [client/src/typeform.js](https://github.com/codurance/soft-mod-compass/blob/master/client/src/typeform.js)

#### Question categories

Questions are grouped in 5 categories
 - Organisational Maturity
 - Continuous Delivery
 - Culture
 - Cross Functional Teams
 - Xp Practices

Each category contains 4 questions.

### HubSpot

Hubspot hosts the whole client flow, that is the pages the user would see when going through Compass.
Husbpot also captures the contact information and stores it as a contact. Hubspot is a tool used by the Sales team to manage client relationships (CRM)
(SoonⓇ: When the report is generated it is automatically uploaded to Hubspot and attached to the contact)

To understand the client flow in more detail, see: [User Flow - In picture](#in-picture)

To update the pages stored on Hubspot, aka client flow:
 - **For the page hosting the typeform survey:** See TODO ADD LINK TO RELEVANT SECTION
 - **For the form and thank you page:** Edit directly in Hubspot: `Marketing -> Website -> Landing Pages`

#### Passing the UUID
We store the UUID in a hidden field on the HubSpot report download form, this is then saved along with their interaction so that we can link the contact with the report. To pass the UUID as a hidden field, it is simply passed as a query parameter in the URL, then on the Hubspot end, it will be available via the following variable `{{request.query_dict.XXX}}`.  
See: [Hubspot Documentation on Hidden Fields](https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string) and [client/index.js](https://github.com/codurance/soft-mod-compass/blob/master/src/client/index.js) (where we inject the Hubspot redirection URL).
See: [client/src/typeform.js](https://github.com/codurance/soft-mod-compass/blob/master/client/src/typeform.js)

### Reporting (jsreport)

The `/report/submit/:UUID` endpoint of the Node app uses the `UUID` to retrieve the user's answers from Typeform, retreive the user details from Hubspot, generate their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file download.

The jsreport console can be found at `/reporting`. This is where you will find the jsreport development environment for updating the report template.

## Running the project

### Config

#### Automatic config download with the Bitwarden CLI

1. Install the Bitwarden CLI: `npm install -g @bitwarden/cli`
1. Install the `jq`: `brew install jq`
1. Login to Bitwarden: `bw login EMAIL@codurance.com`  
   _You can ignore the message about `BW_SESSION`_
1. Run `./scripts/download_config_from_bitwarden.sh`

This will download the latest config files from Bitwarden and place them in the `./scripts/` directory:

- `./scripts/envvars-config-dev-EN.sh`
- `./scripts/envvars-config-dev-ES.sh`
- `./scripts/envvars-config-prod-EN.sh`
- `./scripts/envvars-config-prod-ES.sh`

Also it will generate the hubspot cli configuration needed to deploy the client with `yarn deploy-client` in:

- `./hubspot.config.yml`

### Modifying Compass Survey Template
- Update `index.handlebars` file located in `./client/src`
- Run `yarn deploy-client`, which uploads the files to the [Hubspot Design Manager](https://app.hubspot.com/design-manager/3042464/) and creates the following files in `./dist` folder:     
  - compass-survey-dev-en.html
  - compass-survey-dev-es.html
  - compass-survey-prod-en.html
  - compass-survey-prod-es.html

  
### Running Locally

> **Important**: Before running locally, you **need**:
>
> - **The compass config files saved in `/scripts`. See [Config section](#config)**
> - The `aws` cli installed
>   - `brew install awscli`
> - To be logged in with the corresponding account (`codurance` or `codurance-playground`) and region in the `aws` cli
>   - `aws configure`
>     - https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
>     - Check the correct region in each section below (`playground`/`prod`).  
>       If the region is incorrect, an error will be thrown.
> - Run `yarn install`

Due to the Typeform survey being hosted on [Hubspot](#hubspot) there is no way to run the Typeform portion of Compass locally. However, the following steps enable you to go through the flow and test local changes made to the server part (report generation part):

1. Go to `https://compass-en.codurance.io` and complete survey
   - or `https://compass-es.codurance.io`
1. _(Redirected to the Hubspot details submissions page)_
1. Fill in the form with the email `compass-test@codurance.com`
    - To ensure we don't add unecessary contacts to contact list (polluting the CRM analytics)
1. **BEFORE CLICKING SUBMIT:** Copy the `uuid` that is located in the url and store it somewhere temporarily 
1. Submit the form
1. _(Report is generated)_
1. _(Report is sent to email compass-test@codurance.com)_
1. _(Redirected to Hubspot thank you page)_
1. Run `yarn dev:en` to start the report server
   - or `yarn dev:es`
1. Open another terminal window
1. Make a request to server for the report with `curl http://localhost:8080/report/submit/UUID`
   - `UUID` from step 4.
1. You should be able to see the user's details
1. (Now the report is generated locally)
   - Any log statement will be printed in the terminal where you ran `yarn dev:en` 
   - To make new changes to the code repeat all steps starting from `yarn dev:en` (you can reuse the `uuid`)


> `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

#### Running Locally - With Docker

> To run with Docker you need:
> - Everything needed to run locally (see above)
> - `docker` installed
> - `docker-compose` installed

Run the dev environment:

```bash
# Step 1
./scripts/run_in_docker.sh en # or './scripts/run_in_docker.sh es'

# Step 2
# Go to http://localhost:8080
```

#### Running tests locally

```bash
# Unit tests
yarn test:tdd

# E2E Tests
# For localhost you need a running instance first
# TODO: Check if E2E tests still working!!!
yarn test:e2e:localhost:en
yarn test:e2e:localhost:es
yarn test:e2e:dev:en
yarn test:e2e:dev:es
```

## Deploying the Server side - AWS

**Important**: When deploying to `codurance` or `codurance-playground`, you **need**:

- **The compass config files saved in `/scripts`. See [Config section](#config)**
- The `aws` cli installed
  - `brew install awscli`
- To be logged in with the corresponding account (`codurance` or `codurance-playground`) and region in the `aws` cli
  - `aws configure`
    - https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
    - Check the correct region in each section below (`playground`/`prod`).  
      If the region is incorrect, an error will be thrown.
- The `gettext` utility
  - `brew install gettext`
- The `jq` utility
  - `brew install jq`

### Playground - AWS Region: `eu-west-1`

> **Note:** In all following commands, the language `en` can be swapped for `es`.

Create a dev environment called `compass-dev-en` on AWS (with roles, bucket, EBS, etc.):

> The environment creation will take a couple of minutes.  
> You can check the progress at [Compass Application Dashboard on Elasticbeanstalk](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/application/overview?applicationName=compass)

```sh

yarn create-env:dev:en

```

Deploy current (checked-out) branch to `compass-dev-en`

```sh

yarn deploy:dev:en

```

**Clean Up:** Destroy `compass-dev-en` (and all corresponding resources):

```sh

yarn destroy-env:dev:en

```

### Production - AWS Region: `eu-central-1`

> **Note:** In all following commands, the language `en` can be swapped for `es`.

Deploy current (checked-out) branch to `compass-prod-en`

```sh

yarn deploy:prod:en

```

In production, the environment should already exist.

Create a dev environment called `compass-prod-en` on AWS (with roles, bucket, EBS, etc.):

> The environment creation will take a couple of minutes.  
> You can check the progress at [Compass Application Dashboard on Elasticbeanstalk](https://eu-central-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-central-1#/application/overview?applicationName=compass)

```sh

yarn create-env:prod:en

```

**Clean Up:** Destroy `compass-prod-en` (and all corresponding resources):

```sh

yarn destroy-env:prod:en

```

### HTTPS

The elasticbeanstalk instance will redirect HTTP traffic to HTTPS.
When creating a new enviromnent, you need to manually add an HTTPS listener with a valid certificate.

## Additional Notes

### Generate a Report Manually

To generate a report manually, checkout this branch [use-this-if-need-to-provide-reports-manually](https://github.com/codurance/soft-mod-compass/tree/use-this-if-need-to-provide-reports-manually)

### Deprecated code

HubSpot landing page deployment with Docker has been deprecated.
Check [this commit](https://github.com/codurance/soft-mod-compass/commit/8adc74e0e3fb9aefbc49ef6f3ed580e39d260964)
