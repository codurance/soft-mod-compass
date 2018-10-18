# Codurance Compass

 A survey for checking the level of practices at your company.

## Running locally

:blue_diamond: Note that `yarn` can be substituted for `npm`/`npm run` if you don't have yarn. (Yarn is easily installed on mac with `brew install yarn`)

```
yarn install

yarn start # go to localhost:8080
```

## Running with docker

```
docker build -t codurance-compass .
docker run codurance-compass
```

## Testing locally

```
yarn test
```

## Testing with docker

```
./run-tests-in-docker.sh
```

## Continuous Delivery

The pipeline for this project lives in AWS CodePipeline.

The current URL for the deployed version is http://codurance-compass.eu-west-1.elasticbeanstalk.com/

