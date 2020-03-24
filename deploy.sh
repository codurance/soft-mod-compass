#!/bin/bash

ROLE='role--acl-delete-me'
POLICY='policy--acl-delete-me'
INSTANCE_PROFILE='instance-profile--acl-delete-me'
BUCKET='bucket--acl-delete-me'
APP_NAME='compass'
ENV_NAME='test'
STACK_NAME='64bit Amazon Linux 2018.03 v2.14.2 running Docker 18.09.9-ce'
TRUST_FILE='file:///Users/arnaud/Library/Application Support/JetBrains/IntelliJIdea2020.1/scratches/aws/deployment/compass-trust.json'
POLICY_FILE='file:///Users/arnaud/Library/Application Support/JetBrains/IntelliJIdea2020.1/scratches/aws/deployment/compass-policies.json'
OPTION_SETTINGS_FILE='file:///Users/arnaud/Library/Application Support/JetBrains/IntelliJIdea2020.1/scratches/aws/deployment/option-settings.json'

git archive master -o aws-artifact.zip

aws s3 mb s3://${BUCKET}
aws iam create-role \
    --role-name ${ROLE} \
    --assume-role-policy-document "${TRUST_FILE}"

aws iam put-role-policy \
    --role-name ${ROLE} \
    --policy-name ${POLICY} \
    --policy-document "${POLICY_FILE}"

aws iam create-instance-profile \
    --instance-profile-name ${INSTANCE_PROFILE}

aws iam add-role-to-instance-profile \
    --role-name ${ROLE} \
    --instance-profile-name ${INSTANCE_PROFILE}

aws elasticbeanstalk create-environment \
    --application-name ${APP_NAME} \
    --environment-name ${ENV_NAME} \
    --solution-stack-name "${STACK_NAME}" \
    --option-settings "${OPTION_SETTINGS_FILE}"
