#!/bin/bash

if [[ $# -lt 1 ]] ; then
    echo "ERROR: missing target environment"
    exit 1
fi

BASEDIR=$(dirname $0)
ENV_NAME=$1
APP_NAME='compass'
FULL_NAME=${APP_NAME}-${ENV_NAME}
ROLE="role-"${FULL_NAME}
POLICY="policy-${FULL_NAME}"
# exported because it's used in option-settings.json
export INSTANCE_PROFILE="instance-profile-${FULL_NAME}"
# exported because it's used in compass-policies.json
export BUCKET="bucket-${FULL_NAME}"
STACK_NAME='64bit Amazon Linux 2018.03 v2.14.3 running Docker 18.09.9-ce'
TRUST_FILE="file://${BASEDIR}/iam/compass-trust.json"
POLICY_FILE="${BASEDIR}/iam/compass-policies.json"
OPTION_SETTINGS_FILE="${BASEDIR}/eb/option-settings.json"
OPTION_SETTINGS_FILE_FOR_UPDATE="${BASEDIR}/eb/option-settings-update.json"
EB_FULL_ACCESS="arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkService"
S3_LIFECYCLE_FILE="file://${BASEDIR}/s3/s3-lifecycle.json"

loadFileAndReplaceEnvVariables() {
    envsubst < "${1}"
}

OPTION_SETTINGS=$(loadFileAndReplaceEnvVariables "${OPTION_SETTINGS_FILE}")
POLICY_DOCUMENT=$(loadFileAndReplaceEnvVariables "${POLICY_FILE}")

echo "creating compass bucket [${BUCKET}] .."
aws s3 mb s3://${BUCKET}

aws s3api put-bucket-lifecycle-configuration \
    --bucket ${BUCKET} \
    --lifecycle-configuration "${S3_LIFECYCLE_FILE}"

echo "creating compass role: [${ROLE}] .."
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

echo "creating compass instance profile: [${INSTANCE_PROFILE}] .."
aws iam create-instance-profile \
    --instance-profile-name ${INSTANCE_PROFILE}

echo "adding role to instance profile .."
aws iam add-role-to-instance-profile \
    --role-name ${ROLE} \
    --instance-profile-name ${INSTANCE_PROFILE}

echo "creating compass environment [${ENV_NAME}] .."
aws elasticbeanstalk create-environment \
    --application-name ${APP_NAME} \
    --environment-name ${ENV_NAME} \
    --solution-stack-name "${STACK_NAME}" \
    --option-settings "${OPTION_SETTINGS}"

# TODO cleanup ?
