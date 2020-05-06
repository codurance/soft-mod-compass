#!/bin/bash
function stop_on_first_failure { set -e -o pipefail; }

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
    VERSION_LABEL=$(uuidgen)
    ARTIFACT='aws-artifact.zip'
}

function build_artifact_for_master {
    echo "Building and uploading artifact [${ARTIFACT}] .."
    git archive master -o ${ARTIFACT}
}

function upload_artifact_to_s3 {
    ARTIFACT_BUCKET=$(aws elasticbeanstalk create-storage-location | jq -r '.S3Bucket')
    ARTIFACT_S3="s3://${ARTIFACT_BUCKET}/${VERSION_LABEL}-${ARTIFACT}"
    aws s3 cp ${ARTIFACT} ${ARTIFACT_S3}
}

function deploy_artifact_to_elasticbean_and_set_envvars {
    echo "creating application version  [${VERSION_LABEL}] .."
    aws elasticbeanstalk create-application-version \
        --application-name ${APP_NAME} \
        --version-label ${VERSION_LABEL} \
        --source-bundle "S3Bucket=${ARTIFACT_BUCKET},S3Key=${VERSION_LABEL}-${ARTIFACT}"

    echo "updating environment  [${ENV_NAME}] .."
    aws elasticbeanstalk update-environment \
        --environment-name ${ENV_NAME} \
        --version-label ${VERSION_LABEL} \
        --option-settings "${OPTION_SETTINGS_FOR_UPDATE}"
}

stop_on_first_failure
initialize_variables $1
build_artifact_for_master
upload_artifact_to_s3
deploy_artifact_to_elasticbean_and_set_envvars