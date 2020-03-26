#!/usr/bin/env bash

BASEDIR=$(dirname $0)
APP_NAME='compass'
ENV_NAME='integration'
FULL_NAME=${APP_NAME}-${ENV_NAME}
# exported because it's used in option-settings-update.json
export BUCKET="bucket-${FULL_NAME}"
VERSION_LABEL=$(uuid)
ARTIFACT='aws-artifact.zip'
ARTIFACT_S3="s3://${BUCKET}/${ARTIFACT}"
POLICY_FILE="${BASEDIR}/iam/compass-policies.json"
OPTION_SETTINGS_FILE="${BASEDIR}/eb/option-settings.json"
OPTION_SETTINGS_FILE_FOR_UPDATE="${BASEDIR}/eb/option-settings-update.json"

loadFileAndReplaceEnvVariables() {
    envsubst < "${1}"
}

OPTION_SETTINGS_FOR_UPDATE=$(loadFileAndReplaceEnvVariables "${OPTION_SETTINGS_FILE_FOR_UPDATE}")

git archive master -o ${ARTIFACT}

aws s3 cp ${ARTIFACT} ${ARTIFACT_S3}

aws elasticbeanstalk create-application-version \
    --application-name ${APP_NAME} \
    --version-label ${VERSION_LABEL} \
    --source-bundle S3Bucket=${BUCKET},S3Key=${ARTIFACT}

aws elasticbeanstalk update-environment \
    --environment-name ${ENV_NAME} \
    --version-label ${VERSION_LABEL} \
    --option-settings "${OPTION_SETTINGS_FOR_UPDATE}"
