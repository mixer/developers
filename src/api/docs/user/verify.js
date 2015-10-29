import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import SuccessfulResult from "./successfulExample.js";

export default class ConfirmUserMethod extends Method {
  uri() { return "/api/v1/users/:id/confirm"; }
  version() { return 1; }
  httpMethod() { return "PATCH"; }
  group() { return "user"; }
  description() {
    return (
      <div>
        <p>
          This verifies a new user's account from the code sent to their
          inbox on registration. This step is necessary before they will be
          able to log in.
        </p>
        <p>
          If they verify successfully, they will be logged into their account
          via session cookie.
        </p>
      </div>
    )
  }

  parameters() {
    return [
      new IDParameter(),
      new CodeParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulResult(),
      new ErrorfulResult()
    ];
  }
}

class CodeParameter extends Parameter {
  name() { return "code"; }
  description() { return "Alphanumeric confirmation code."; }
}

class ErrorfulResult extends Example {
  httpCode() { return 404; }
  data() { return "User not found, did you already verify your account?"; }
}
