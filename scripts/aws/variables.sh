BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )" # src: https://stackoverflow.com/a/246128/4490991

ENV_NAME=$1
APP_NAME='compass'
FULL_NAME=${APP_NAME}-${ENV_NAME}
ROLE="role-"${FULL_NAME}
POLICY="policy-${FULL_NAME}"
# exported because it's used in option-settings.json
export INSTANCE_PROFILE="instance-profile-${FULL_NAME}"
# exported because it's used in compass-policies.json and option-settings-update.json
export REPORT_BUCKET="bucket-${FULL_NAME}"
STACK_NAME='64bit Amazon Linux 2018.03 v2.15.0 running Docker 19.03.6-ce'
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
OPTION_SETTINGS_FOR_UPDATE=$(loadFileAndReplaceEnvVariables "${OPTION_SETTINGS_FILE_FOR_UPDATE}")
POLICY_DOCUMENT=$(loadFileAndReplaceEnvVariables "${POLICY_FILE}")