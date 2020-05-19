#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DEV_EN="720d1f1a-53a7-422e-80c9-abb400fd1f93"
DEV_ES="8352463a-ff60-44a4-88b7-abb400fcf24e"
PROD_EN="91c3fce4-5bb2-404c-bd37-abb400fe241c"
PROD_ES="20dd36e5-4b8c-4b25-aa86-abb400fd6b5e"
 
bw unlock --check
if [ $? -eq 0 ]
then
  echo "No need to re-enter your bitwarden password"
else
  echo "Enter your bitwarden password"
  export BW_SESSION=$(bw unlock --raw)
fi

bw sync
bw get item $DEV_EN | jq '.notes' -r > $DIR/envvars-config-dev-EN.sh
bw get item $DEV_ES | jq '.notes' -r > $DIR/envvars-config-dev-ES.sh
bw get item $PROD_EN | jq '.notes' -r > $DIR/envvars-config-prod-EN.sh
bw get item $PROD_ES | jq '.notes' -r > $DIR/envvars-config-prod-ES.sh
 
echo ""
echo "The following files were created:"
echo ""
echo "  - ./scripts/envvars-config-dev-EN.sh"
echo "  - ./scripts/envvars-config-dev-ES.sh"
echo "  - ./scripts/envvars-config-prod-EN.sh"
echo "  - ./scripts/envvars-config-prod-ES.sh"
echo ""
