#!/bin/bash
function stop_on_first_failure { set -e -o pipefail; }

# For now sourcing the dev-EN variables to be able to run cypress without warning of missing envvars during build
# TODO: Investigate cleaner solution
. ./scripts/envvars-config-dev-en.sh

docker-compose build
docker-compose run compass yarn run test:e2e
