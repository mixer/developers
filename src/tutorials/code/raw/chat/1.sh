#!/bin/bash

# authenticate with backend
# hush progress
# we send json as content type
# a json body as payload
# and store the cookies in a jar!
userInfo=$(curl -X POST \
-s \
-H "Content-Type: application/json" \
-d '{"username": "USERNAME OR EMAIL", "password": "PASSWORD"}' \
-c cookies.jar \
https://beam.pro/api/v1/users/login )

# jq . <<< $userInfo # use for inspection of data

channelId=$(jq .channel.id <<< $userInfo); # extract channel id
userId=$(jq .id <<< $userInfo); # extract user id
echo $channelId $userId;
