#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Source: https://aws.amazon.com/blogs/devops/introducing-application-load-balancer-unlocking-and-optimizing-architectures/


# TODO: DO NOT HARDCODE VPC ID
DEFAULT_VPC_ID=vpc-1ee65b79

TARGET_GROUP_ARNS_PATH=$DIR/target_group_arns

function create_target_group_arn_dir_if_does_not_exist {
    if [[ ! -d "$TARGET_GROUP_ARNS_PATH" ]]; then
        mkdir $TARGET_GROUP_ARNS_PATH
    fi
}

function create_target_group_and_save_arn_to_file {
    TARGET_GROUP_NAME=$1
    TARGET_GROUP_ARN=$(aws elbv2 create-target-group \
                            --name $TARGET_GROUP_NAME \
                            --protocol HTTP \
                            --port 80 \
                            --vpc $DEFAULT_VPC_ID \
                            | jq '.TargetGroups[0].TargetGroupArn' -r)

    echo $TARGET_GROUP_ARN > $TARGET_GROUP_ARNS_PATH/$TARGET_GROUP_NAME
}

create_target_group_arn_dir_if_does_not_exist
create_target_group_and_save_arn_to_file compass-dev-en
create_target_group_and_save_arn_to_file compass-dev-es
