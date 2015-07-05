import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";

export default class FindOneChannel extends Method {
  uri() { return "/api/v1/channels/:id/log"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "This endpoint lists logs relative to a given channel."; }
  parameters() { return [ new IdParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult() ]; }
}

class IdParameter extends Parameter {
  name() { return "id"; }
  description() { return "Channel ID to retrieve the log for."; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      "data": {
        "by": "2",
        "role": "Mod",
        "target": "1"
      },
      "ip": null,
      "originating": null,
      "source": 2,
      "target": null,
      "time": "2015-01-17T02:44:23.789Z",
      "type": "chat:role:channel"
    }];
  }
}
