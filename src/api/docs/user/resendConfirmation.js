import Method from "../../method.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";

export default class ResendConfirmationMethod extends Method {
  uri() { return "/api/v1/users/:id/confirm/resend"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }

  description() { return "Triggers a confirmation email to be resent."; }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulExample(), new ErrorfulExample() ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() { return "Confirmation email resent."; }
}

class ErrorfulResult extends Example {
  httpCode() { return 404; }
  data() { return "User not found, did you already verify your account?"; }
}
