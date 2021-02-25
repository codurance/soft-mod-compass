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

## React frontend

React hosts the whole client flow, that is the pages the user would see when going through Compass.
React will collect answers, user information and the language (en/es). Every time the user sees a new question, React sends an event to Google Tag Manager with the index and the label of the question.
When a user ends, the data will be sent to NodeJS app and the user will be redirected to the HubSpot thank you page.

To update the pages stored on Hubspot, aka client flow:

- **For the form and thank you page:** Edit directly in Hubspot: `Marketing -> Website -> Landing Pages`
<br/>
<br/>

## NodeJS backend

### Reporting flow

TODO : class diagram

The `post /survey` endpoint receives the user details, survey data and the language, stores the survey in DynanoDB, generates their scores and then creates a view model for the report which is piped into [jsreport](https://jsreport.net/learn/adapting-jsreport). jsreport combines the view model with a Handlebars template and returns a pdf file.
The pdf is uploaded to HubSpot.
Finally Node app will send a request to Hubspot with the user data and the pdf link and Hubspot will create a contact and send the email.
<br/>
<br/>

## Running the project Locally

### local mode only


> **NodeJS App**
>
> **Important**: Before running locally, you **need**:
>
> - Create a localConf.sh file inside of /backend/scripts
```bash
#!/usr/bin/env bash

export LOCAL_MODE=true
export ALLOWED_ORIGIN=http://localhost:3000
```
> - Add execution permissions for both files, inside of /backend/scripts execute the following command
```bash
chmod 711 localConf.sh
```

> - move inside /backend
> - run ```npm install```
> - run ```npm run local```
> - application will be available on http://localhost:8080


> **React**
>
> - move inside /client
> - npm install
> - npm run start
> - Webpack will load the application at http://localhost:3000

> **User flow**
>
>
> - Go to `http://localhost:3000` or `http://localhost:3000?lang=es` and complete survey
> - Submit the form
> - _(Redirected to Hubspot thank you page)_
> - _(Report is generated)_
> - When we run the application locally, the pdf will be generated in `/backend/tmp` but not sent to the email



### run local app against dev database and hubspot account

update the localConf.sh file with the one located in bitwarden.
<br/>
<br/>

> **reprocess flow**
> - the logs are monitored in cloudwatch, and a compass dashboard filters the failed surveys
> - find the id of surveys that can be reprocessed ( compare dynamodb surveys table and cloudwatch compass report to find which id has not been reprocessed)
> - execute the reprocess with postman
example of local request (replace :id)
```
curl --location --request PATCH 'http://localhost:8080/surveys/:id' \
--data-raw ''
```

## Running tests locally

```bash
# Unit tests go to /client or /backend and execute
npm run test

# E2E go to /testE2E
npm install
npm run e2e
```

<br/>
<br/>
<br/>

## Modifying PDF report

To modify the pdf from a graphic ui, we need to run the project locally and then go to https://localhost:8080/reporting This is where you will find the jsreport development environment for updating the report template.

<br/>
<br/>
<br/>
<br/>
<br/>

## CI/CD

> There are multiples Github Actions prepared to be executed each time we push. If we push a branch (not dev or master) the CI workflow will be executed, this workflow will run tests for front and backend application and create build for frontend.
> On a merge request creation against Master, the e2e test is run
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
- [CloudWatch](https://aws.amazon.com/cloudwatch/) allows us monitor the app, and send alarms to devs in case of failures

### Development enviromnent diagram

> ![Infrastructure dev enviromnent](docs/diagrams/out/dev-infrastructure.png?raw=true)

### Production enviromnent diagram

> ![Infrastructure dev enviromnent](docs/diagrams/out/prod-infrastructure.png?raw=true)
