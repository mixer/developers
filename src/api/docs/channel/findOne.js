import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulExample from "./successfulResponse.js";

export default class FindOneMethod extends Method {
  uri() { return "/api/v1/channels/:id"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "channels" }
  description() {
    return (
      <p>
        This endpoint retrieves a single fully-populated channel by its ID or
        token. If the user is authenticated, we add a status to the output,
        indicating if the user is following and/or subscribed to the chanel.
      </p>
    )
  }

  parameters() {
    return [
      new IDParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulExample(),
      new ErrorfulResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The channel numeric id or token of the channel to retrieve."; }
}

class ErrorfulResult extends Example {
  httpCode() { return 404; }
  data() { return "Channel not found."; }
}
