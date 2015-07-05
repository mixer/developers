import Method from "../../method.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class TwoFactorRecoverMethod extends Method {
  uri() { return "/api/v1/users/:id/2fa/codes"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "Produces a list of codes a user can utilize to " +
                         "recover their account if their device is stolen or lost."; }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulResult(), new AccessDeniedResult(),
                        new ResourceMissingResult("Credentials") ]; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      "85b2eaf17a95",
      "3af4acda01e7",
      "cca4d37d1ef7",
      "f2d6e2849cf3",
      "e6125522460a",
      "203f7bd4a4e0",
      "b0dfec5fd085",
      "2a9582be1587",
      "1d0310d6359a",
      "28d5968184bc",
      "5b8b2e6bbd6e",
      "9f96ed35ba9d",
      "54649ba2701c",
      "e53ce7f984e7",
      "c1d2af29fbe7",
      "4d9b1dbf8e1b"
    ];
  }
}
