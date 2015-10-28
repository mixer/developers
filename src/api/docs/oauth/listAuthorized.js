import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AuthorizedResponse from "./authorizedResponse.js";

export default class listAuthorizedOauthClientsMethod extends Method {
  uri() { return "/api/v1/users/:id/oauth/authorized"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "oauth" }
  description() {
    return (
      <p>
        This endpoint lists all OAuth clients that the provided user
        has allowed access on their account. This includes all permission
        grants per application.
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
      new AuthorizedResponse(),
      new AccessDeniedResponse()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The numeric user id for whom to query the authorized clients."; }
}

class AccessDeniedResponse extends Example {
  httpCode() { return 403; }
  data() { return ""; }
  description() { return "Returns when access is denied." }
}
