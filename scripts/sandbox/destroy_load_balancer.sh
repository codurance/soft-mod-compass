#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Source: https://aws.amazon.com/blogs/devops/introducing-application-load-balancer-unlocking-and-optimizing-architectures/


# TODO: DO NOT HARDCODE VPC ID
DEFAULT_VPC_ID=vpc-1ee65b79
TARGET_GROUP_ARNS_PATH=$DIR/target_group_arns

function delete_all_target_groups {
    for ARN_FILE in $TARGET_GROUP_ARNS_PATH/*; do
        aws elbv2 delete-target-group \
            --target-group-arn $(cat $ARN_FILE)
        rm $ARN_FILE
    done
}

delete_all_target_groups

# function create_target_group {
#     TARGET_GROUP_NAME=$1
#     aws elbv2 delete-target-group \
#         --target-group-arn <value>
# }

# create_target_group compass-dev-en
# create_target_group compass-dev-es
