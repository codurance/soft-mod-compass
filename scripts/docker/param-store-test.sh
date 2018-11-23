#!/usr/bin/env bash

export HUBSPOT_AUTH_TOKEN=$(aws ssm get-parameter --name "/Prod/Compass/hubspot-auth-token" --with-decryption --query Parameter.Value --output text)
echo $HUBSPOT_AUTH_TOKEN