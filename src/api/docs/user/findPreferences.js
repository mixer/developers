import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";

export default class FindPreferencesMethod extends Method {
  uri() { return "/api/v1/users/:id/preferences"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "user"; }
  description() { return "Lists preferences for a user."; }

  parameters() {
    return [
      new IDParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulExample()
    ];
  }
}

class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "channel:mature:allowed": true,
      "channel:notifications": {
        "ids": [
          "118"
        ],
        "transports": [
          "notify",
          "email"
        ]
      },
      "channel:player:forceflash": false,
      "chat:chromakey": false,
      "chat:colors": true,
      "chat:emotes": true,
      "chat:sounds:html5": true,
      "chat:sounds:notification": "ping",
      "chat:sounds:play": true,
      "chat:sounds:volume": 1,
      "chat:tagging": true,
      "chat:timestamps": false,
      "chat:whispers": true
    }
  }
}
