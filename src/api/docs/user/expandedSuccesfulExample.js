import Example from "../../example.js";

export default class ExpandedSuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "avatars": [
        {
          "createdAt": new Date().toISOString(),
          "id": 1097,
          "meta": {
            "size": "16x16"
          },
          "relid": "146",
          "remotePath": "avatars/146-16x16.jpg",
          "store": "s3",
          "type": "user:avatar",
          "updatedAt": new Date().toISOString(),
          "url": "https://s3.amazonaws.com/uploads.beam.pro/avatars/146-16x16.jpg"
        },
        {
          "createdAt": new Date().toISOString(),
          "id": 1100,
          "meta": {
            "size": "24x24"
          },
          "relid": "146",
          "remotePath": "avatars/146-24x24.jpg",
          "store": "s3",
          "type": "user:avatar",
          "updatedAt": new Date().toISOString(),
          "url": "https://s3.amazonaws.com/uploads.beam.pro/avatars/146-24x24.jpg"
        },
        {
          "createdAt": new Date().toISOString(),
          "id": 1102,
          "meta": {
            "size": "32x32"
          },
          "relid": "146",
          "remotePath": "avatars/146-32x32.jpg",
          "store": "s3",
          "type": "user:avatar",
          "updatedAt": new Date().toISOString(),
          "url": "https://s3.amazonaws.com/uploads.beam.pro/avatars/146-32x32.jpg"
        },
        {
          "createdAt": new Date().toISOString(),
          "id": 1105,
          "meta": {
            "size": "64x64"
          },
          "relid": "146",
          "remotePath": "avatars/146-64x64.jpg",
          "store": "s3",
          "type": "user:avatar",
          "updatedAt": new Date().toISOString(),
          "url": "https://s3.amazonaws.com/uploads.beam.pro/avatars/146-64x64.jpg"
        },
        {
          "createdAt": new Date().toISOString(),
          "id": 1105,
          "meta": {
            "size": "128x128"
          },
          "relid": "146",
          "remotePath": "avatars/146-128x128.jpg",
          "store": "s3",
          "type": "user:avatar",
          "updatedAt": new Date().toISOString(),
          "url": "https://s3.amazonaws.com/uploads.beam.pro/avatars/146-128x128.jpg"
        },
        {
          "createdAt": new Date().toISOString(),
          "id": 1109,
          "meta": {
            "size": "256x256"
          },
          "relid": "146",
          "remotePath": "avatars/146-256x256.jpg",
          "store": "s3",
          "type": "user:avatar",
          "updatedAt": new Date().toISOString(),
          "url": "https://s3.amazonaws.com/uploads.beam.pro/avatars/146-256x256.jpg"
        }
      ],
      "bio": null,
      "channel": {
        "audience": "G",
        "coverId": 145,
        "createdAt": new Date().toISOString(),
        "description": "\n\t Lead developer at Beam!\n",
        "featured": false,
        "id": 129,
        "name": "Some beam backend development! asdsadsdfs",
        "numFollowers": 52,
        "numSubscribers": 0,
        "online": false,
        "partnered": false,
        "suspended": false,
        "thumbnailId": 1713,
        "token": "connor4312",
        "transcodingEnabled": true,
        "updatedAt": new Date().toISOString(),
        "userId": 146,
        "viewersCurrent": 6,
        "viewersTotal": 458
      },
      "createdAt": new Date().toISOString(),
      "deletedAt": null,
      "email": "connor@xxx.xxx",
      "groups": [
        {
          "id": 1,
          "name": "User"
        },
        {
          "id": 7,
          "name": "Developer"
        }
      ],
      "hasTwoFactor": false,
      "id": 146,
      "points": 55,
      "preferences": {
        "channel:notifications": {
          "ids": [],
          "transports": [
            "notify",
            "email"
          ]
        },
        "chat:chromakey": false,
        "chat:colors": true,
        "chat:emotes": true,
        "chat:sounds:notification": {},
        "chat:sounds:play": true,
        "chat:sounds:volume": 1,
        "chat:tagging": true,
        "chat:timestamps": false
      },
      "social": {
        "facebook": "",
        "twitter": "null",
        "youtube": "null"
      },
      "updatedAt": new Date().toISOString(),
      "username": "connor4312",
      "verified": true
    }
  }
}
