#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


EXTRACT_ID_OF_DEFAULT_VPC='.Vpcs[] | {default: .IsDefault, id: .VpcId} | select(.default == true) | .id'

DEFAULT_VPC_ID=$(aws ec2 describe-vpcs | jq "$EXTRACT_ID_OF_DEFAULT_VPC" -r)

echo $DEFAULT_VPC_ID

