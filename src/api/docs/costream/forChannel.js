import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResponse from "../../accessDeniedResult.js";

export default class CostreamsForChannelMethod extends Method {
  uri() { return "/api/v1/channels/:id/costreams"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "costream"; }

  description() {
    return (
      <p>
        This lists retrieves all costream requests on a channel. Costream
        requests expire after 7 days and will no longer be retrievable after that
        time.
      </p>
    );
  }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulResponse(), new AccessDeniedResponse() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Channel ID to get the requests for."; }
}

class SuccesfulResponse extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      created: new Date().toISOString(),
      id: "27ed9948-f9cb-4945-8e5a-d1585989d177",
      requester: 3,
      status: "pending",
      target: 2
    }];
  }
}
