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
    VERSION_LABEL=$(uuidgen)
    ARTIFACT='aws-artifact.zip'
    ARTIFACT_FILE=${BASEDIR}/${ARTIFACT}
}

function build_artifact_for_current_branch {
    echo "Building artifact [${ARTIFACT}] .."
    CURRENT_BRANCH=$(git branch --show-current)
    git archive ${CURRENT_BRANCH} -o ${ARTIFACT_FILE}
}

function upload_artifact_to_s3 {
    echo "Uploading artifact [${ARTIFACT}] .."
    ARTIFACT_BUCKET=$(aws elasticbeanstalk create-storage-location | jq -r '.S3Bucket')
    ARTIFACT_S3="s3://${ARTIFACT_BUCKET}/${VERSION_LABEL}-${ARTIFACT}"
    aws s3 cp ${ARTIFACT_FILE} ${ARTIFACT_S3}
}

function delete_local_artifact {
    echo "Removing local artifact [${ARTIFACT}] .."
    rm ${ARTIFACT_FILE}
}

function deploy_artifact_to_elasticbean_and_set_envvars {
    echo "Creating application version  [${VERSION_LABEL}] .."
    aws elasticbeanstalk create-application-version \
        --application-name ${APP_NAME} \
        --version-label ${VERSION_LABEL} \
        --source-bundle "S3Bucket=${ARTIFACT_BUCKET},S3Key=${VERSION_LABEL}-${ARTIFACT}"

    echo "Updating environment  [${ENV_NAME}] .."
    aws elasticbeanstalk update-environment \
        --environment-name ${ENV_NAME} \
        --version-label ${VERSION_LABEL} \
        --option-settings "${OPTION_SETTINGS_FOR_UPDATE}"
}

stop_on_first_failure
initialize_variables $1
build_artifact_for_current_branch
upload_artifact_to_s3
delete_local_artifact
deploy_artifact_to_elasticbean_and_set_envvars