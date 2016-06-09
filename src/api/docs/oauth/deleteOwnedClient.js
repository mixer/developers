import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulResponse from "./successfulResponse.js";

export default class deleteOauthClientMethod extends Method {
  uri() { return "/api/v1/oauth/clients/:id"; }
  version() { return 1; }
  httpMethod() { return "DELETE"; }
  group() { return "oauth" }
  description() {
    return (
      <p>
        Deletes an OAuth client from Beam. This will remove
        all authorizations by that client which means that
        any tokens generated by this client will be invalidated.
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
      new SuccessfulResponse(),
      new ErrorfulResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The id string for the OAuth application."; }
}

class ErrorfulResult extends Example {
  httpCode() { return 404; }
  data() { return "Client not found."; }
}
