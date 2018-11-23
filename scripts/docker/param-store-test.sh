export HUBSPOT_TOKEN=$(aws ssm get-parameters --names HubSpot --region eu-west-1 --with-decryption --query Parameters[0].Value --output text)
echo $HUBSPOT_TOKEN