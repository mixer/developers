# get server connection info
# use cookie we got
chatJoinInfo=$(curl \
-s \
-H "Content-Type: application/json" \
-b cookies.jar \
https://beam.pro/api/v1/chats/$channelId )

wsServer=$(jq -r .endpoints[0] <<< $chatJoinInfo)
authKey=$(jq .authkey <<< $chatJoinInfo)

echo $wsServer $authKey;
