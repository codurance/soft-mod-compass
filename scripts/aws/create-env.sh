#!/bin/bash
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )" # src: https://stackoverflow.com/a/246128/4490991

function stop_on_first_failure { set -e -o pipefail; }

function ensure_env_tag_provided_as_argument {
    if [[ $# -lt 1 ]] ; then
        echo "ERROR: missing environment tag"
        exit 1
    fi
}

function initialize_variables {
    ensure_env_tag_provided_as_argument $1
    ENV_TAG=$1
    . ${BASEDIR}/variables.sh $ENV_TAG
}

function create_and_configure_s3_bucket {
    echo "creating compass bucket [${REPORT_BUCKET}] .."
    aws s3 mb s3://${REPORT_BUCKET}
    
    aws s3api put-bucket-lifecycle-configuration \
        --bucket ${REPORT_BUCKET} \
        --lifecycle-configuration "${S3_LIFECYCLE_FILE}"
}

function create_role_to_allow_access_to_s3_and_send_mail {
    echo "creating compass role: [${ROLE}] .."
    aws iam create-role \
        --role-name ${ROLE} \
        --assume-role-policy-document "${TRUST_FILE}"
    
    aws iam put-role-policy \
        --role-name ${ROLE} \
        --policy-name ${POLICY} \
        --policy-document "${POLICY_DOCUMENT}"
}

function create_instance_profile_and_add_role_to_it {
    echo "creating compass instance profile: [${INSTANCE_PROFILE}] .."
    aws iam create-instance-profile \
        --instance-profile-name ${INSTANCE_PROFILE}
    
    echo "adding role to instance profile .."
    aws iam add-role-to-instance-profile \
        --role-name ${ROLE} \
        --instance-profile-name ${INSTANCE_PROFILE}
}

function create_env_with_instance_profile {
    echo "creating compass environment [${ENV_NAME}] .."
    aws elasticbeanstalk create-environment \
        --application-name ${APP_NAME} \
        --environment-name ${ENV_NAME} \
        --solution-stack-name "${STACK_NAME}" \
        --option-settings "${OPTION_SETTINGS}"
}


stop_on_first_failure
initialize_variables $1
create_and_configure_s3_bucket
create_role_to_allow_access_to_s3_and_send_mail
create_instance_profile_and_add_role_to_it
create_env_with_instance_profile