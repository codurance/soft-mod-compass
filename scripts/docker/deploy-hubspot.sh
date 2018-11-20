#!/usr/bin/env bash

docker build -t codurance-compass .
docker run --rm codurance-compass yarn deploy:hubspot
