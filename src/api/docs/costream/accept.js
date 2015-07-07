import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResponse from "../../accessDeniedResult.js";
import ResourceMissingResponse from "../../resourceMissingResult.js";

export default class AcceptCostreamRequestMethod extends Method {
  uri() { return "/api/v1/costreams/:id/accept"; }
  version() { return 1; }
  httpMethod() { return "PATCH"; }
  description() { return "Causes a costream request to be accepted."; }
  group() { return "costream"; }

  parameters() { return [ new IDParameter() ]; }
  examples() {
    return [
      new SuccesfulExample(),
      new ResourceMissingResponse("Request"),
      new AccessDeniedResponse()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "UUID of the request to accept."; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      created: new Date().toISOString(),
      id: "d4fcfa4d-6e80-4034-a3f7-965819825f8e",
      requester: 3,
      status: "accepted",
      target: 2
    }
  }
}
