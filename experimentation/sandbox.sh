#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

BASE_URL=https://api.hubapi.com
HUBSPOT_AUTH_TOKEN="5ef1881f-72ab-4ef0-a0a5-a5fa87498018"

http \
    $BASE_URL/filemanager/api/v2/files \
    hapikey==$HUBSPOT_AUTH_TOKEN \
    name__icontains==compass

