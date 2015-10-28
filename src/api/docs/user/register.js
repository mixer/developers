import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ErrorfulResult from "../../errorfulResponse.js";

export default class RegisterUserMethod extends Method {
  uri() { return "/api/v1/users"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }
  description() { return "Registers a new user with Beam."; }

  parameters() {
    return [
      new UsernameParameter(),
      new PasswordParameter(),
      new EmailParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulResult(),
      new ErrorfulResult()
    ];
  }
}

class UsernameParameter extends Parameter {
  name() { return "username"; }
  description() { return "Username for the user."; }
}

class PasswordParameter extends Parameter {
  name() { return "password"; }
  description() { return "Password for authentication."; }
}

class EmailParameter extends Parameter {
  name() { return "email"; }
  description() { return "The email address associated with the user."; }
}

class SuccessfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      createdAt: new Date().toISOString(),
      email: "connor@example.com",
      id: 1,
      points: 0,
      updatedAt: new Date().toISOString(),
      username: "connor4312",
      verified: false
    }
  }
}
