#!/usr/bin/env bash
set -e

docker build -t codurance-compass .
docker run --env HUBSPOT_AUTH_TOKEN=$HUBSPOT_AUTH_TOKEN --rm codurance-compass yarn deploy:hubspot
