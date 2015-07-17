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
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulExample() ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "chat:colors": true,
      "chat:emotes": true,
      "chat:sounds:notification": "ping",
      "chat:sounds:play": true,
      "chat:sounds:volume": 1,
      "chat:tagging": true,
      "chat:timestamps": false,
      "channel:mature:allowed": true
    }
  }
}
