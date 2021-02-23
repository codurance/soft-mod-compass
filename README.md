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

## React frontend

React hosts the whole client flow, that is the pages the user would see when going through Compass. Reacts will collect answers, user information and the language (en/es). Every time the user sees a new question, React sends an event to Google Tag Manager with the index and the label of the question.
When an user ends, the data is will be sent to NodeJS app and the user will be redirected to HubSpot thank you page.

To update the pages stored on Hubspot, aka client flow:

- **For the form and thank you page:** Edit directly in Hubspot: `Marketing -> Website -> Landing Pages`

<br/>
<br/>
<br/>

## NodeJS backend

### Reporting flow

> ![compass sequence diagram](docs/diagrams/out/report-diagram.png?raw=true)

The `post /survey` endpoint receives the user details, survey data and the language, stores the survey in DynanoDB, generates their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file.
The pdf will be uploaded to HubSpot.
Finally Node app will sends a request to Hubspot with the user data and the pdf link and Hubspot will create a contact and send the email.

<br/>
<br/>
<br/>
<br/>
<br/>

## Running the project Locally

> **Important**: Before running locally, you **need**:
>
> - Create a localConf.sh and localDB.sh files inside of /backend/scripts , the information to fill the file is in bitwarden (localConf and localDB).
> - Add execution permissions for both files, inside of /backend/scripts execute the following command

```bash
chmod 711 localConf.sh localDB.sh

```

> **NodeJS App**
>
> - move inside /backend
> - npm install
> - npm run local
> - NodeJS will load the dev enviroment at http://localhost:8080

> **React**
>
> - move inside /client
> - npm install
> - npm run start
> - Webpack will load the dev enviroment at http://localhost:3000

> **User flow**
>
> - Go to `http://localhost:3000` or `http://localhost:3000?lang=es` and complete survey
> - Submit the form
> - _(Redirected to Hubspot thank you page)_
> - _(Report is generated)_
> - When we run the application locally, the pdf will be generated in `/backend/tmp` and not sended to the email

<br/>
<br/>
<br/>

## Running tests locally

```bash
# Unit tests go to /client or /backend and execute
npm run test

# E2E go to /TestE2E
npm install
npm run e2e
```

<br/>
<br/>
<br/>

## Modifying Compass Survey Template

- Update `index.handlebars` file located in `./client/src`
- Run `yarn deploy-client`, which uploads the files to the [Hubspot Design Manager](https://app.hubspot.com/design-manager/3042464/) and creates the following files in `./dist` folder:
  - compass-survey-dev-en.html
  - compass-survey-dev-es.html
  - compass-survey-prod-en.html
  - compass-survey-prod-es.html

> `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

## Modifying PDF report

To modify the pdf from a graphic ui, we need to run the project locally and then go to https://localhost:8080/reporting This is where you will find the jsreport development environment for updating the report template.

<br/>
<br/>
<br/>
<br/>
<br/>

## CI/CD

> There are multiples Github Actions prepared to be executed each time we push. If we push a branch (not dev or master) the CI workflow will be executed, this workflow will run tests for front and backend application and create build for frontend.

### Deploy Development Enviroment

> Every time we push code in dev branch, the code will be deployed through a Github Action

### Deploy Production Enviroment

> Every time we push code in master branch, the code will be deployed through a Github Action

<br/>
<br/>
<br/>

## Infrastruscture

All the infrastructure is managed in Amazon Web Services, we use the following services.

- [S3 Bucket](https://aws.amazon.com/s3/) to host the frontend and store the backend package
- [Elasticbeanstalk](https://aws.amazon.com/elasticbeanstalk/) to deploy NodeJS app
- [CloudFront](https://aws.amazon.com/cloudfront/) allow us to add ssl certificate for the React app
- [DynanoDB](https://aws.amazon.com/dynamodb/) stores the surveys in order to reproduce the failing ones
- [Route 53](https://aws.amazon.com/route53/) allows us to create friendly urls like compass.codurance.com

### Development enviromnent diagram

> ![Infrastructure dev enviromnent](docs/diagrams/out/dev-infrastructure.png?raw=true)

### Production enviromnent diagram

> ![Infrastructure dev enviromnent](docs/diagrams/out/prod-infrastructure.png?raw=true)

### HTTPS

In prod environment elasticbeanstalk instance will redirect HTTP traffic to HTTPS.
When creating a new enviromnent, you need to manually add an HTTPS listener with a valid certificate.

## Additional Notes

### Generate a Report Manually

If you want to generate the pdf report manually, just need to run the project locally, the pdf will be under /backend/temp/test.pdf

### Deprecated code

HubSpot landing page deployment with Docker has been deprecated.
Check [this commit](https://github.com/codurance/soft-mod-compass/commit/8adc74e0e3fb9aefbc49ef6f3ed580e39d260964)
