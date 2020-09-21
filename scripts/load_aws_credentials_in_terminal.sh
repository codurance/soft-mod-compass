#!/bin/bash

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Make sure you are SOURCING this script, and not just executing it"
  exit 1
fi


credentials=$(aws sts \
    assume-role \
    --role-arn arn:aws:iam::300563897675:role/FullAdminAccessRole \
    --role-session-name "Compass-LocalDev-Playground" \
    --profile codurance-user |
    jq '.Credentials')

export AWS_ACCESS_KEY_ID=$(echo $credentials | jq -r '.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo $credentials | jq -r '.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo $credentials | jq -r '.SessionToken')
