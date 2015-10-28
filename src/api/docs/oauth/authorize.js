import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import CodeResponse from "./codeResponse.js";

export default class getOauthTokensMethod extends Method {
  uri() { return "/api/v1/oauth/authorize"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "oauth"; }
  description() {
    return (
      <div>
        <p>
          This endpoint returns an authorization_code for the user.
          The user should be logged in before hitting this endpoint.
        </p>

        <p>
          If you're building an application you can open a popup
          to <a href="#">https://beam.pro/oauth/authorize</a> (so without /api/v1),
          including the same query parameters, to provide the user with a graphical
          interface to accept the authorization. Beam will then redirect back to the
          provided callback_uri.
        </p>
      </div>
    )
  }

  parameters() {
    return [
      new ResponseTypeParameter(),
      new ClientIDParameter(),
      new PermissionsParameter(),
      new RedirectURIParameter()
    ];
  }
  examples() {
    return [
      new CodeResponse(),
      new UnsupportedResponseTypeResult(),
      new AccessDeniedResult(),
      new InvalidScopeResult()
    ];
  }
}

class ResponseTypeParameter extends Parameter {
  name() { return "response_type"; }
  type() { return "query"; }
  description() { return "The type of OAuth response that you'd like. Currently supported: 'code'"; }
}

class ClientIDParameter extends Parameter {
  name() { return "client_id"; }
  type() { return "query"; }
  description() { return "The OAuth client's id string."; }
}

class PermissionsParameter extends Parameter {
  name() { return "permissions"; }
  type() { return "query"; }
  description() { return "A space separated list of permissions to grant."; }
}


class RedirectURIParameter extends Parameter {
  name() { return "redirect_uri"; }
  type() { return "query"; }
  description() { return "The redirect URI for your app's requests."; }
}

class ErrorfulResult extends Example {
  httpCode() { return 404; }
  data() { return "Client not found."; }
}

class UnsupportedResponseTypeResult extends Example {
  httpCode() { return 400; }
  data() { return "unsupported_response_type"; }
  description() { return "The response_type you selected is not supported."; }
}

class AccessDeniedResult extends Example {
  httpCode() { return 403; }
  data() { return "access_denied"; }
  description() { return "The provided client doesn't exist or the redirect uri doesn't match any of the allowed hostnames."; }
}

class InvalidScopeResult extends Example {
  httpCode() { return 400; }
  data() { return "invalid_scope"; }
  description() { return "Permission validation failed. This could be due to the user not having access to that permission or the string was misformatted."; }
}