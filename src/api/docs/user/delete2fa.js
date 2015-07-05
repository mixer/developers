import Method from "../../method.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class RemoveTwoFactorCredentialsMethod extends Method {
  uri() { return "/api/v1/users/:id/2fa"; }
  version() { return 1; }
  httpMethod() { return "DELETE"; }
  description() { return "Removes two-factor credentials from an account."; }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulResult(), new AccessDeniedResult() ]; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() { return "Two-factor disabled."; }
}
