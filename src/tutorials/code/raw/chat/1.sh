#!/bin/bash

# request user details
userInfo=$(curl \
-s \
-H "Content-Type: application/json" \
-H "Authorization: Bearer AUTH_TOKEN" \
https://mixer.com/api/v1/users/current )

# jq . <<< $userInfo # use for inspection of data

channelId=$(jq .channel.id <<< $userInfo); # extract channel id
userId=$(jq .id <<< $userInfo); # extract user id
echo $channelId $userId;
