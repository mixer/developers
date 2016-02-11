import Example from "../../example.js";

export default class ExpandedSuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "avatarUrl": "https://uploads.beam.pro/avatar/146.jpg",
      "bio": "",
      "channel": {
        "audience": "family",
        "badgeId": null,
        "coverId": 39551,
        "createdAt": new Date().toISOString(),
        "deletedAt": null,
        "description": "<p> Lead developer at Beam! </p>",
        "featured": false,
        "ftl": 0,
        "hasVod": false,
        "id": 129,
        "interactive": false,
        "name": "Working on some Tetris/Interactive code!",
        "numFollowers": 55,
        "online": false,
        "partnered": false,
        "suspended": false,
        "tetrisGameId": null,
        "thumbnailId": 1713,
        "token": "connor4312",
        "transcodingEnabled": true,
        "typeId": null,
        "updatedAt": new Date().toISOString(),
        "userId": 146,
        "viewersCurrent": 0,
        "viewersTotal": 544
      },
      "createdAt": new Date().toISOString(),
      "deletedAt": null,
      "experience": 349,
      "groups": [
        {
          "id": 7,
          "name": "Staff"
        },
        {
          "id": 1,
          "name": "User"
        }
      ],
      "id": 146,
      "social": {
        "player": "http://player.me/connor",
        "twitter": "http://twitter.com/ConnorPeet"
      },
      "sparks": 17638,
      "updatedAt": new Date().toISOString(),
      "username": "connor4312",
      "verified": true
    }
  }
}
