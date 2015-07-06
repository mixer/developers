import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class TwoFactorVerify extends Method {
  uri() { return "/api/v1/users/:id/2fa/verify"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }

  description() { return (
    <p>
      Verifies and activates the user's two-factor auth credentials, using a code
      generated on their device.
    </p>
  )}
  parameters() { return [ new IDParameter(), new CodeParameter() ]; }
  examples() { return [ new SuccesfulResult(), new InvalidCodeResult(),
                        new MissingCredentialsResult(), new AccessDeniedResult() ]; }
}

class CodeParameter extends Parameter {
  name() { return "code"; }
  description() { return "The numeric six-digit TOTP code."; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() { return "Code verified"; }
}

class InvalidCodeResult extends Example {
  httpCode() { return 200; }
  data() { return "Invalid code."; }
}

class MissingCredentialsResult extends Example {
  httpCode() { return 404; }
}
