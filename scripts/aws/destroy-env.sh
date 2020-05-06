#!/bin/bash
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"  # src: https://stackoverflow.com/a/246128/4490991

function ensure_env_name_provided_as_argument {
    if [[ $# -lt 1 ]] ; then
        echo "ERROR: missing target environment"
        exit 1
    fi
}

function initialize_variables {
    ensure_env_name_provided_as_argument $1
    ENV_NAME=$1
    . ${BASEDIR}/variables.sh $ENV_NAME
}

function terminate_environment {
    echo "Terminating Environmnent [${ENV_NAME}] ..."
    aws elasticbeanstalk terminate-environment \
        --environment-name ${ENV_NAME}
}

function delete_instance_profile {
    echo "Removing Role [${ROLE}] from Instance Profile [${INSTANCE_PROFILE}] ..."
    aws iam remove-role-from-instance-profile \
        --instance-profile-name ${INSTANCE_PROFILE} \
        --role-name ${ROLE}
        
    echo "Deleting Instance Profile [${INSTANCE_PROFILE}] ..."
    aws iam delete-instance-profile \
        --instance-profile-name ${INSTANCE_PROFILE}
}

function delete_compass_role {
    echo "Deleting Role [${ROLE}] ..."
    aws iam delete-role-policy \
        --role-name ${ROLE} \
        --policy-name ${POLICY}

    aws iam delete-role \
        --role-name ${ROLE}
}

function delete_s3_bucket {
    echo "Deleting compass bucket [${REPORT_BUCKET}] ..."
    aws s3 rb s3://${REPORT_BUCKET} \
        --force
}


initialize_variables $1
terminate_environment
delete_instance_profile
delete_compass_role
delete_s3_bucket