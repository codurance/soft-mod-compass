#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

function stop_on_first_failure { set -e -o pipefail; }
function to_uppercase { echo "$1" | tr a-z A-Z; }

stop_on_first_failure

if [ -z $1 ]; then
    echo "Please enter a value: 'en' | 'es'"
    exit 1
fi
LANGUAGE=$(to_uppercase $1)

trap 'docker-compose down' EXIT
. ./scripts/envvars-config-dev-$LANGUAGE.sh
docker-compose up --build
