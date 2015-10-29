import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";

export default class FindOneUser extends Method {
  uri() { return "/api/v1/users/:id/log"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "This endpoint lists logs relative to a given user."; }
  group() { return "log"; }

  parameters() {
    return [
      new IdParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulExample(),
      new AccessDeniedResult()
    ];
  }
}

class IdParameter extends Parameter {
  name() { return "id"; }
  description() { return "User ID to retrieve the log for."; }
}

class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      "data": {
        "channel": "2",
        "role": "Mod"
      },
      "ip": "127.0.0.1",
      "originating": true,
      "source": 2,
      "target": 1,
      "time": new Date().toISOString(),
      "type": "chat:role:user"
    }];
  }
}
