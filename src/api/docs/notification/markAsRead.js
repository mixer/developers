import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import { IDParameter, SinceParameter, BeforeParameter } from "./parameters.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class MarkAsReadMethod extends Method {
  uri() { return "/api/v1/users/:user/notifications/read"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "notification"; }

  description() {
    return (
      <p>
        Hitting this endpoint sets the <code>readAt</code> time on notifications
        where they were previously <code>null</code>.
      </p>
    );
  }
  parameters() { return [ new IDParameter(), new SinceParameter(), new BeforeParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      createdAt: new Date().toISOString(),
      data: { "user": "2" },
      readAt: new Date().toISOString(),
      type: "channel:follow",
      user: 2
    }];
  }
}
