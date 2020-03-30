#!/bin/bash

if [[ $# -lt 1 ]] ; then
    echo "ERROR: missing target environment"
    exit 1
fi

BASEDIR=$(dirname $0)
ENV_NAME=$1
APP_NAME='compass'
FULL_NAME=${APP_NAME}-${ENV_NAME}
VERSION_LABEL=$(uuidgen)
ARTIFACT='aws-artifact.zip'
POLICY_FILE="${BASEDIR}/iam/compass-policies.json"
OPTION_SETTINGS_FILE="${BASEDIR}/eb/option-settings.json"
OPTION_SETTINGS_FILE_FOR_UPDATE="${BASEDIR}/eb/option-settings-update.json"

loadFileAndReplaceEnvVariables() {
    envsubst < "${1}"
}

OPTION_SETTINGS_FOR_UPDATE=$(loadFileAndReplaceEnvVariables "${OPTION_SETTINGS_FILE_FOR_UPDATE}")

echo "building and uploading artifact [${ARTIFACT}] .."
git archive master -o ${ARTIFACT}

BUCKET=$(aws elasticbeanstalk create-storage-location | jq -r '.S3Bucket')
ARTIFACT_S3="s3://${BUCKET}/${VERSION_LABEL}-${ARTIFACT}"

aws s3 cp ${ARTIFACT} ${ARTIFACT_S3}

echo "creating application version  [${VERSION_LABEL}] .."
aws elasticbeanstalk create-application-version \
    --application-name ${APP_NAME} \
    --version-label ${VERSION_LABEL} \
    --source-bundle "S3Bucket=${BUCKET},S3Key=${VERSION_LABEL}-${ARTIFACT}"

echo "updating environment  [${ENV_NAME}] .."
aws elasticbeanstalk update-environment \
    --environment-name ${ENV_NAME} \
    --version-label ${VERSION_LABEL} \
    --option-settings "${OPTION_SETTINGS_FOR_UPDATE}"
