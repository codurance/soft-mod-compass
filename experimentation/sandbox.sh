#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

BASE_URL=https://api.hubapi.com
HUBSPOT_AUTH_TOKEN="5ef1881f-72ab-4ef0-a0a5-a5fa87498018"

CONTACT_TO_ENGAGEMENT_ASSOCIATION_ID=9 # See: https://legacydocs.hubspot.com/docs/methods/crm-associations/crm-associations-overview

COMPASS_TEST_USER_ID=7542201
FLORIAN_KEMPENICH_OWNERID=46375477
TODAY_EPOCH=1594056257000
ID_OF_UPLOADED_IMGTEST=31945409335

function upload_imgtest_and_print_id {
    http \
        -f POST \
        $BASE_URL/filemanager/api/v2/files \
        hapikey==$HUBSPOT_AUTH_TOKEN \
        files@./imgtest.png \
        folder_paths='Compass Sandbox' \
        | jq '.objects[0].id'
}

function print_compass_test_contact_info {
    http \
        $BASE_URL/contacts/v1/contact/vid/$COMPASS_TEST_USER_ID/profile \
        hapikey==$HUBSPOT_AUTH_TOKEN \
        | jq '.properties | {firstname: .firstname.value, email: .email.value}'
}


function list_owners {
    http \
        $BASE_URL/owners/v2/owners/ \
        hapikey==$HUBSPOT_AUTH_TOKEN \
        | jq '.[] | {id: .ownerId, email: .email}'
}


function create_engagement_with_imgtest {
    # Engagement is a note w/ attachement
    ENGAGEMENT_JSON=$(jq -n \
        --arg FLORIAN_KEMPENICH_OWNERID $FLORIAN_KEMPENICH_OWNERID \
        --arg TODAY_EPOCH $TODAY_EPOCH \
        --arg COMPASS_TEST_USER_ID $COMPASS_TEST_USER_ID \
        --arg ID_OF_UPLOADED_IMGTEST $ID_OF_UPLOADED_IMGTEST \
        -f ./engagement.jq)

    echo "$ENGAGEMENT_JSON" \
        | http \
            POST \
            $BASE_URL/engagements/v1/engagements \
            hapikey==$HUBSPOT_AUTH_TOKEN \
        | jq '.engagement | {engagement_id: .id}'
}

function get_all_engagement_associated_with_compass_test_contact {
    http \
        $BASE_URL/crm-associations/v1/associations/$COMPASS_TEST_USER_ID/HUBSPOT_DEFINED/$CONTACT_TO_ENGAGEMENT_ASSOCIATION_ID \
        hapikey==$HUBSPOT_AUTH_TOKEN \
        | jq '.results | {engagement_ids: .}'
}
function delete_engagement {
    ENGAGEMENT_ID=$1

    http \
        DELETE \
        $BASE_URL/engagements/v1/engagements/$ENGAGEMENT_ID \
        hapikey==$HUBSPOT_AUTH_TOKEN
}



create_engagement_with_imgtest
get_all_engagement_associated_with_compass_test_contact