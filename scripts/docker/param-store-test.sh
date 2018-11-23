export HUBSPOT_TOKEN=$(aws ssm get-parameter --name "HubSpot" --with-decryption --query Parameter.Value)
echo $HUBSPOT_TOKEN