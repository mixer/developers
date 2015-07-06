import React from "react";

import Method from "../../method.js";
import Example from "../../example.js";

import { IDParameter, SinceParameter, BeforeParameter } from "./parameters.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class NotificationForUserMethod extends Method {
  uri() { return "/api/v1/users/:id/notifications"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "notification"; }

  description() {
    return (
      <div>
        <p>
          This lists retrieves a user's notifications. You should pass a since
          time, in the reasonable past, to retrieve the notifications for.
        </p>
        <p>
          Note that all notifications expire after 14 days and, after that
          time, cannot be retrieved.
        </p>
      </div>
    );
  }
  parameters() { return [ new IDParameter(), new SinceParameter(), new BeforeParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult() ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
          createdAt: new Date().toISOString(),
          data: { user: "30" },
          readAt: null,
          type: "channel:follow",
          user: 2
      },
      {
          createdAt: new Date().toISOString(),
          data: { user: "20" },
          readAt: new Date().toISOString(),
          type: "channel:follow",
          user: 2
      }
    ];
  }
}
