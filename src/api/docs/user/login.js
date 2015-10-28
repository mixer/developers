import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ExpandedSuccessfulExample from "./expandedSuccessfulExample.js";

export default class UserLoginMethod extends Method {
  uri() { return "/api/v1/users/login"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }
  description() {
    return (
      <div>
        <p>
          Hitting this endpoint causes the user's credentials to be
          authenticated and, if successful, their session is persisted
          via cookie.
        </p>
        <p>
          Use of this endpoint is very specific. If you're looking for a
          way to authenticate users on your application, you should use our
          OAuth API.
        </p>
      </div>
    );
  }

  parameters() {
    return [
      new UsernameParameter(),
      new PasswordParameter(),
      new CodeParameter()
    ];
  }
  examples() {
    return [
      new ExpandedSuccessfulExample(),
      new UnauthorizedExample(),
      new Unauthorized2faExample(),
      new RateLimitExample()
    ];
  }
}

class UsernameParameter extends Parameter {
  name() { return "username"; }
  description() { return "The username to authenticate with."; }
}

class PasswordParameter extends Parameter {
  name() { return "password"; }
  description() { return "The password to authenticate with."; }
}

class CodeParameter extends Parameter {
  name() { return "code"; }
  description() { return "A two-factor authentication code."; }
  optional() { return true; }
}

class UnauthorizedExample extends Example {
  httpCode() { return 401; }
  data() {
    return {
      message: "Invalid username or password.",
      error: "credentials"
    }
  }
}

class Unauthorized2faExample extends Example {
  httpCode() { return 401; }
  data() {
    return {
      message: "Invalid two-factor code.",
      error: "2fa"
    }
  }
}

class RateLimitExample extends Example {
  httpCode() { return 429; }
  data() { return "Too many invalid login attempts. Please wait a few minutes"; }
}
