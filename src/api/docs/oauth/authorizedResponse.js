import Example from "../../example.js";

export default class AuthorizedResponse extends Example {
  httpCode() {
    return 200;
  }

  data() {
    return [
      {
        "user_id": 1337,
        "client_id": "6f15941e56af8239ee4a6233d6a9f97aa49ba263e125b52e",
        "permissions": [
          "user:details:self",
          "channel:details:self"
        ],
        "client": {
          "client_id": "6f15941e56af8239ee4a6233d6a9f97aa49ba263e125b52e",
          "name": "ConnorZone",
          "website": "https://connor.peet",
          "logo": "https://s3.amazonaws.com/uploads.beam.pro/oauth-logo/6f15941e56af8239ee4a6233d6a9f97aa49ba263e125b52e.png",
          "hosts": [
            "127.0.0.1",
            "connor.zone"
          ]
        }
      }
    ]
  }
}


