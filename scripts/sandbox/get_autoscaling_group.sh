#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

ENV_TAG=$1
ENV_NAME="compass-$ENV_TAG"

aws elasticbeanstalk \
    describe-environment-resources \
    --environment-name $ENV_NAME \
    | jq '.EnvironmentResources.AutoScalingGroups[0].Name'
