import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ErrorfulResponse from "../../errorfulResponse.js";
import ResourceMissingResponse from "../../resourceMissingResult.js";
import AccessDeniedResponse from "../../accessDeniedResult.js";

export default class CreateCostreamRequestMethod extends Method {
  uri() { return "/api/v1/channels/costreams"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  description() { return "Creates and sends a costream request."; }
  group() { return "costream"; }

  parameters() { return [ new FromParameter(), new ToParameter() ]; }
  examples() {
    return [
      new SuccesfulResponse(),
      new ErrorfulResponse(),
      new ResourceMissingResponse("Channel"),
      new AccessDeniedResponse
    ];
  }
}

class FromParameter extends Parameter {
  name() { return "from"; }
  description() { return "ID of the channel who is making the request."; }
}

class ToParameter extends Parameter {
  name() { return "to"; }
  description() { return "Array of channel IDs of which to send the request."; }
}

class SuccesfulResponse extends Example {
  httpCode() { return 200; }
  data() { return "Requests have been sent."; }
}
