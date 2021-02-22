#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

EXPECTED_REGION=$1
CURRENT_REGION=$(aws configure get region)

if [ "$EXPECTED_REGION" != "$CURRENT_REGION" ]; then
    echo "Please make sure the 'aws' cli is configured to use the '$EXPECTED_REGION' region"
    exit 1
fi