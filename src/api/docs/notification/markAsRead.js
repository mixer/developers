import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import { IDParameter, SinceParameter, BeforeParameter } from "./parameter.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class MarkAsReadMethod extends Method {
  uri() { return "/api/v1/users/:user/notifications/read"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  description() { return "Hitting this endpoint sets the readAt time on " +
                         "notifications where they previously were null."; }
  parameters() { return [ new IDParameter(), new SinceParameter(), new BeforeParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {[{
      createdAt: Date.now().toISOString(),
      data: { "user": "2" },
      readAt: Date.now().toISOString(),
      type: "channel:follow",
      user: 2
    }]};
  }
}
