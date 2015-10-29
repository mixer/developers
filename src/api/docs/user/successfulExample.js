import Example from "../../example.js";

export default class SuccessfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "avatars": [ /* array of Resources */ ],
      "channel": { /* Channel object */ },
      "createdAt": new Date().toISOString(),
      "display_name": "ConnorPeet",
      "email": "connor@example.com",
      "follows": [ /* array of Follows */ ],
      "id": 2,
      "notifications": null,
      "points": 9,
      "reset_time": null,
      "social_facebook": "connor.peet",
      "social_twitter": "ConnorPeet",
      "social_youtube": "connorpeet",
      "updatedAt": new Date().toISOString(),
      "username": "connor4312",
      "verified": true
    }
  }
}
