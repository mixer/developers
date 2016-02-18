import Example from "../../example.js";

export default class SuccessfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "audience": "family",
      "badge": null,
      "badgeId": null,
      "cache": [],
      "cover": {
        "createdAt": new Date().toISOString(),
        "id": 39551,
        "meta": {
          "small": "https://beam.pro/_latest/img/backgrounds/small-development-001.jpg"
        },
        "relid": null,
        "remotePath": "img/backgrounds/development-001.jpg",
        "store": "nil",
        "type": "channel:cover",
        "updatedAt": new Date().toISOString(),
        "url": "https://beam.pro/_latest/img/backgrounds/development-001.jpg"
      },
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
      "preferences": {
        "channel:links:allowed": true,
        "channel:links:clickable": true,
        "channel:links:slowchat": 500,
        "channel:notify:follow": false,
        "channel:notify:followmessage": "%USER% is now following.",
        "channel:notify:subscribe": true,
        "channel:notify:subscribemessage": "%USER% subscribed to the channel!",
        "channel:partner:submail": "Welcome to my channel, thanks for subscribing.",
        "channel:player:muteOwn": true,
        "channel:slowchat": 500,
        "channel:tweet:body": "I just went live on Beam! %URL%",
        "channel:tweet:enabled": false,
        "costream:allow": "all",
        "sharetext": "I'm watching %USER%'s awesome stream. Come check it out here: %URL%"
      },
      "status": {
        "follows": {
          "channel": 129,
          "createdAt": new Date().toISOString(),
          "updatedAt": new Date().toISOString(),
          "user": 693
        },
        "roles": [
          "Pro",
          "User"
        ]
      },
      "suspended": false,
      "tetrisGameId": null,
      "thumbnail": {
        "createdAt": new Date().toISOString(),
        "id": 1713,
        "meta": {
          "size": [
            405,
            225
          ]
        },
        "relid": 129,
        "remotePath": "thumbnails/129.jpg",
        "store": "s3",
        "type": "channel:thumbnail",
        "updatedAt": new Date().toISOString(),
        "url": "https://uploads.beam.pro/thumbnails/129.jpg"
      },
      "thumbnailId": 1713,
      "token": "connor4312",
      "transcodingEnabled": true,
      "type": null,
      "typeId": null,
      "updatedAt": new Date().toISOString(),
      "user": {
        "avatarUrl": "https://uploads.beam.pro/avatar/146.jpg",
        "bio": "",
        "createdAt": new Date().toISOString(),
        "deletedAt": null,
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
        "experience": 86864,
        "level": 87,
        "updatedAt": new Date().toISOString(),
        "username": "connor4312",
        "verified": true
      },
      "userId": 146,
      "viewersCurrent": 0,
      "viewersTotal": 544
    }
  }
}
