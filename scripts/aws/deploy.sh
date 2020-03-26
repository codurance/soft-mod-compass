#!/bin/bash

BASEDIR=$(dirname $0)

ROLE='role--acl-delete-me'
POLICY='policy--acl-delete-me'
export INSTANCE_PROFILE='instance-profile--acl-delete-me'
export BUCKET='bucket--acl-delete-me'
APP_NAME='compass'
ENV_NAME='test-8'
VERSION_LABEL='test-8'
STACK_NAME='64bit Amazon Linux 2018.03 v2.14.2 running Docker 18.09.9-ce'
ARTIFACT='aws-artifact.zip'
ARTIFACT_S3="s3://${BUCKET}/${ARTIFACT}"
TRUST_FILE="file://${BASEDIR}/iam/compass-trust.json"
POLICY_FILE="${BASEDIR}/iam/compass-policies.json"
OPTION_SETTINGS_FILE="${BASEDIR}/eb/option-settings.json"
OPTION_SETTINGS_FILE_FOR_UPDATE="${BASEDIR}/eb/option-settings-update.json"
EB_FULL_ACCESS="arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess"
S3_LIFECYCLE_FILE="file://${BASEDIR}/s3/s3-lifecycle.json"

loadFileAndReplaceEnvVariables() {
    envsubst < "${1}"
}

OPTION_SETTINGS_FOR_UPDATE=$(loadFileAndReplaceEnvVariables "${OPTION_SETTINGS_FILE_FOR_UPDATE}")
OPTION_SETTINGS=$(loadFileAndReplaceEnvVariables "${OPTION_SETTINGS_FILE}")
POLICY_DOCUMENT=$(loadFileAndReplaceEnvVariables "${POLICY_FILE}")

aws s3 mb s3://${BUCKET}

aws s3api put-bucket-lifecycle-configuration \
    --bucket ${BUCKET} \
    --lifecycle-configuration "${S3_LIFECYCLE_FILE}"

aws iam create-role \
    --role-name ${ROLE} \
    --assume-role-policy-document "${TRUST_FILE}"

aws iam put-role-policy \
    --role-name ${ROLE} \
    --policy-name ${POLICY} \
    --policy-document "${POLICY_DOCUMENT}"

aws iam attach-role-policy \
    --role-name ${ROLE} \
    --policy-arn ${EB_FULL_ACCESS}

aws iam create-instance-profile \
    --instance-profile-name ${INSTANCE_PROFILE}

aws iam add-role-to-instance-profile \
    --role-name ${ROLE} \
    --instance-profile-name ${INSTANCE_PROFILE}

aws elasticbeanstalk create-environment \
    --application-name ${APP_NAME} \
    --environment-name ${ENV_NAME} \
    --solution-stack-name "${STACK_NAME}" \
    --option-settings "${OPTION_SETTINGS}"

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

# TODO properly name resources (compass prefix + env name suffix)
# TODO logging
# TODO separate create-env from deploy
# TODO cleanup ?
