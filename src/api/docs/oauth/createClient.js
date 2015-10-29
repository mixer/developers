import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulResponse from "./successfulResponse.js";

export default class createOauthClientMethod extends Method {
  uri() { return "/api/v1/oauth/clients"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "oauth" }
  description() {
    return (
      <div>
        <p>
          Creates a new OAuth client. A logo is required to display
          to the clients when authorizing.
        </p>

        <p>
          To create a client without a secret key (like mobile phone apps)
          you can provide false for the secret parameter.
        </p>
      </div>

    )
  }

  parameters() {
    return [
      new NameParameter(),
      new WebsiteParameter(),
      new HostsParameter(),
      new SecretParameter(),
      new LogoParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulResponse(),
      new ErrorfulResult()
    ];
  }
}

class NameParameter extends Parameter {
  type() { return "body"; }
  name() { return "name"; }
  description() { return "The name for the OAuth client."; }
}

class WebsiteParameter extends Parameter {
  name() { return "website"; }
  type() { return "body"; }
  description() { return "The website for the OAuth client."; }
}

class HostsParameter extends Parameter {
  name() { return "hosts"; }
  type() { return "body"; }
  description() { return "An array of allowed hosts. Wildcards can be used to allow a bigger range of (sub)domains."; }
}

class SecretParameter extends Parameter {
  name() { return "secret"; }
  type() { return "body"; }
  description() { return "A boolean that defines whether to generate a secret token or not."; }
}

class LogoParameter extends Parameter {
  name() { return "logo"; }
  type() { return "body"; }
  description() { return "The logo file for the OAuth client."; }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
  data() {
    return [
      {
        "message": "\"name\" is required",
        "path": "name",
        "type": "any.required",
        "context": {
          "key": "name"
        }
      }
    ];
  }
}
