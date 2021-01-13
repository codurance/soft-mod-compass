#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

$DIR/upload_new_version_to_hubspot.sh $DIR/../client/dist/compass-survey-dev-en.html compass-dev-en.html
$DIR/upload_new_version_to_hubspot.sh $DIR/../client/dist/compass-survey-dev-es.html compass-dev-es.html
$DIR/upload_new_version_to_hubspot.sh $DIR/../client/dist/compass-survey-prod-en.html compass-prod-en.html
$DIR/upload_new_version_to_hubspot.sh $DIR/../client/dist/compass-survey-prod-es.html compass-prod-es.html
