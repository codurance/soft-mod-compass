#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
COMPASS_HTML_FILE=$2
PATH_ON_HUBSPOT="Templates/Custom/Page/Codurance Landing Page/compass-survey-templates/$COMPASS_HTML_FILE"
LOCAL_FILE=$1

hs upload "$LOCAL_FILE" "$PATH_ON_HUBSPOT"