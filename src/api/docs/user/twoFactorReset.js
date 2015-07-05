import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class TwoFactorRecoverMethod extends Method {
  uri() { return "/api/v1/users/reset/2fa"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }

  description() { return "This endpoint should be used when a user no longer " +
                         "has access to the device they use for two-factor " +
                         "authentication. It can be used to removed two-factor " +
                         "verification so that the user may log in."; }
  parameters() { return [ new UsernameParameter(), new PasswordParameter(),
                          new CodeParameter() ]; }
  examples() { return [ new SuccesfulResult(), new AccessDeniedResult(),
                        new ErrorfulExample() ]; }
}

class UsernameParameter extends Parameter {
  name() { return "username"; }
  description() { return "The username of the user to recover."; }
}

class CodeParameter extends Parameter {
  name() { return "code"; }
  description() { return "A recovery code."; }
}

class PasswordParameter extends Parameter {
  name() { return "password"; }
  description() { return "The password of the user to recover."; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() { return "Two-factor authentication disabled."; }
}

class ErrorfulExample extends Example {
  httpCode() { return 400; }
  data() { return "Invalid or insufficient data provided in order to recover " +
                  "the user."; }
}
