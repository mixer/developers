import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import SuccessfulExample from "./successfulExample.js";
import AccessDeniedResponse from "../../accessDeniedResult.js";
import ErrorfulResponse from "../../errorfulResponse.js";

export default class SomeAPIMethod extends Method {
  uri() { return "/api/v1/users/:id"; }
  version() { return 1; }
  httpMethod() { return "PUT"; }
  group() { return "user"; }
  description() { return "Updates user profile information."; }

  parameters() {
    return [
      new IDParameter(),
      new EmailParameter(),
      new PasswordParameter(),
      new PasswordVerifyParameter(),
      new SocialParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulExample(),
      new AccessDeniedResponse(),
      new ErrorfulResponse()
    ];
  }
}

class EmailParameter extends Parameter {
  name() { return "email"; }
  description() { return "Email connected to the user's account."; }
  optional() { return true; }
  deafult() { return undefined; }
}

class PasswordParameter extends Parameter {
  name() { return "password"; }
  description() {
    return (
      <p>
        The user's password. If passed, you must also pass the
        <code>passwordVerify</code> given below.
      </p>
    );
  }

  optional() { return true; }
  deafult() { return undefined; }
}

class PasswordVerifyParameter extends Parameter {
  name() { return "passwordVerify"; }
  description() {
    return (
      <p>
        The user's current password, which you are attempting to change. Only
        required if you have password <code>password</code>.
      </p>
    );
  }

  optional() { return true; }
  deafult() { return undefined; }
}

class SocialParameter extends Parameter {
  name() { return "social"; }
  description() {
    return (
      <div>
        <p>
          An object with keys being social networks, and values being usernames
          on the networks. Valid networks are:
        </p>
        <ul>
          <li><code>facebook</code></li>
          <li><code>player</code></li>
          <li><code>twitter</code> (ignoring the <code>@</code> symbol)</li>
          <li><code>youtube</code></li>
        </ul>
      </div>
    );
  }

  optional() { return true; }
  deafult() { return undefined; }
}
