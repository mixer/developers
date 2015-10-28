import React from "react";

import Method from "../../method.js";
import Example from "../../example.js";

export default class ListEventsMethod extends Method {
  uri() { return "/api/v1/live"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "liveloading"; }
  description() {
    return (
      <p>
        Returns a listing of all interfaces that the requesting socket is
        subscribed to.
      </p>
    );
  }

  parameters() {
    return [];
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
    return [
      "channel:2:status"
    ];
  }
}
