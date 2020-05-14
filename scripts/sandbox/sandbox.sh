#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DEV_EN_AUTOSCALING_GROUP_NAME="awseb-e-u5j7tyiwir-stack-AWSEBAutoScalingGroup-N8RKQGJQR111"
DEV_EN_TARGET_GROUP_ARN="arn:aws:elasticloadbalancing:eu-west-1:300563897675:targetgroup/compass-dev-en/67f0b075452692e5"
DEV_ES_AUTOSCALING_GROUP_NAME="awseb-e-kmyyugqg7m-stack-AWSEBAutoScalingGroup-MIZ47N7VTUZP"
DEV_ES_TARGET_GROUP_ARN="arn:aws:elasticloadbalancing:eu-west-1:300563897675:targetgroup/compass-dev-es/e2f353cfe37e77fc"


# aws autoscaling attach-load-balancer-target-groups \
#     --auto-scaling-group-name $DEV_EN_AUTOSCALING_GROUP_NAME \
#     --target-group-arns $DEV_EN_TARGET_GROUP_ARN

# aws autoscaling attach-load-balancer-target-groups \
#     --auto-scaling-group-name $DEV_ES_AUTOSCALING_GROUP_NAME \
#     --target-group-arns $DEV_ES_TARGET_GROUP_ARN




aws elbv2 create-load-balancer \
    --name example-loadbalancer \
    --subnets "subnet-9de127c4" "subnet-0b1afc20"