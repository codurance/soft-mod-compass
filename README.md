# Codurance Compass

A survey for checking the level of practices at your company.

## User flow

### In picture

![compass sequence diagram](/docs/diagrams/out/sequence-diagram/Compass%20Sequence%20Diagram.png?raw=true)

The above diagram in the `docs` folder is generated from the PlantUML file: `sequence-diagram.puml`.

### TypeForm

TypeForm is used to build and deliver the survey itself. It is a paid service and we have a subscription for the PRO+ tier. Login credentials can be found on the wiki. TypeForm has support for hidden fields and every user who takes the survey is issued with a UUID that we provide when the form is created.

When a user completes the survey the UUID from the hidden field is saved along with their answers. We then use the UUID to query the TypeForm Responses API for a specific user's answers. We use the answers to calculate scores that are used in the report.

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

HubSpot is a CRM service used to host the landing page that captures user contact information once they have downloaded their report. After a user has completed the survey they are redirected to HubSpot with their UUID. Once the user submits the HubSpot landing page form, the user is redirected to `/report/submit/:UUID` of the Node app, which then generates the report that can be downloaded from a link in the email.  
See [User Flow - In picture](#in-picture)

Note we also store the UUID in a hidden field on the HubSpot report download form, this is then saved along with their interaction so that we can link the contact with the report. To pass the UUID as a hidden field, it is simply passed as a query parameter in the URL, then on the Hubspot end, it will be available via the following variable `{{request.query_dict.XXX}}`.  
See: [Hubspot Documentation on Hidden Fields](https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string) and [client/index.js](https://github.com/codurance/soft-mod-compass/blob/master/src/client/index.js) (where we inject the Hubspot redirection URL).

### Reporting (jsreport)

The `/report/submit/:UUID` endpoint of the Node app uses the UUID to query the TypeForm Responses API to retrieve the user's answers, generate their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file download.

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


### Running Locally

> **Note:** The compass flow mostly redirects to Typeform and Hubspot, alongside generating the report.
> Keep in mind that when running locally, compass will still redirect to remote pages in Typeform and Hubspot.
> The configuration will redirect to Dev instances of these pages, but we wanted to make clear that these are not local instances.

> **Important**: Before running locally, you **need**:
>
> - **The compass config files saved in `/scripts`. See [Config section](#config)**
> - Add the line `export AWS_COMPASS_BUCKET='compass-dev-en'` to the config file `envvars-config-dev-EN.sh`
>   (or `export AWS_COMPASS_BUCKET='compass-dev-es'` for `envvars-config-dev-ES.sh`). _See `/scripts/aws/variables.sh`
>   for more info on how the bucket name is formed when running in AWS._
> - The `aws` cli installed
>   - `brew install awscli`
> - To be logged in with the corresponding account (`codurance` or `codurance-playground`) and region in the `aws` cli
>   - `aws configure`
>     - https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
>     - Check the correct region in each section below (`playground`/`prod`).  
>       If the region is incorrect, an error will be thrown.

Run the dev environment:

```bash
# Step 1
yarn install

# Step 2
yarn dev:en # or 'yarn dev:es'

# Step 3
# Go to http://localhost:8080
```

:large_blue_diamond: Note that `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

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
yarn test
```

## Deploying the Project - AWS

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
