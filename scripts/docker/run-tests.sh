#!/usr/bin/env bash
set -e

docker build -t codurance-compass .
docker run --rm codurance-compass yarn test
