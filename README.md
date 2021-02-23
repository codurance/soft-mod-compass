# Codurance Compass

A survey for checking how effective is your organisation's software delivery

## User flow

> ![compass sequence diagram](docs/diagrams/out/compass-sequence-diagram-hs-flow/sequence-diagram.png?raw=true)

The above diagram in the `docs` folder is generated from the PlantUML file: `sequence-diagram.puml`.
To edit and generate png from plantUML files, check out this [VSCode extension](https://github.com/qjebbs/vscode-plantuml)

#### Question categories

Questions are grouped in 5 categories

- Organisational Maturity
- Team Effectiveness
- Continuous Delivery
- XP Practices
- Organisational Culture

Each category contains 4 questions.

<br/>
<br/>
<br/>
<br/>
<br/>

## React frontend

React hosts the whole client flow, that is the pages the user would see when going through Compass. Reacts will collect answers, user information and the language (en/es). Every time the user sees a new question, React sends an event to Google Tag Manager with the index and the label of the question.
When an user ends, the data is will be sent to NodeJS app and the user will be redirected to HubSpot thank you page.

To update the pages stored on Hubspot, aka client flow:

- **For the form and thank you page:** Edit directly in Hubspot: `Marketing -> Website -> Landing Pages`

<br/>
<br/>
<br/>
<br/>
<br/>

## NodeJS backend

### Reporting (jsreport)

### Reporting flow

> ![compass sequence diagram](docs/diagrams/out/report-diagram.png?raw=true)

The `post /survey` endpoint receives the user details, survey data and the language, sotres the survey in DynanoDB, generate their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file.
The pdf will be uploaded to HubSpot.
Finally Node app will sends a request to Hubspot with the user data and the pdf link and Hubspot will create a contact and send the email.

The jsreport console can be found at `/reporting`. This is where you will find the jsreport development environment for updating the report template.

## Running the project Locally

### React

> - move inside /client
> - npm install
> - npm run start
> - Webpack will load the dev enviroment at http://localhost:3000

### NodeJS

> - move inside /backend
> - npm install
> - npm run local
> - NodeJS will load the dev enviroment at http://localhost:8080

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

> **Node App**
>
> - It's necessary to create a localConf.sh file inside of /scripts , the information to fill the file is in bitwarden
> - Run `yarn install`
> - Run `yarn dev`
> - Node app will be available in `http://localhost:8080`

> **React App**
>
> - Run `yarn install`
> - Run `yarn start`
> - React app will be available in `http://localhost:3000`

1. Go to `http://localhost:3000` and complete survey
   - or `http://localhost:3000?lang=es`
1. Submit the form
1. _(Redirected to Hubspot thank you page)_
1. _(Report is generated)_
1. When we run the application locally, the pdf will be generated in `/backend/tmp` and not sended to the email

> `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

#### Running Locally - With Docker

> To run with Docker you need:
>
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
yarn test:e2e:dev:en
yarn test:e2e:dev:es
```

## Deploying the Server side - AWS

#### Modifying AWS Policies

- **DEV environment**
  1. Go to `scripts/aws/iam/compass-policies.json`
  1. Add policy to **Action** list in the first **Statement**
     ```
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "s3:GetObject",
             ...
           ],
           "Resource": "arn:aws:s3:::$REPORT_BUCKET/*"
         },
     }
     ```
  1. Destroy environment
  1. Re-create environment
- **Prod environment**
  1. Modify manually on AWS console

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

> Note: Destroying Prod environment **DELETES ALL THE REPORTS**

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
