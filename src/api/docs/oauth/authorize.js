import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import TokenResponse from "./tokenResponse.js";

export default class getOauthTokensMethod extends Method {
    uri() { return "/api/v1/oauth/authorize"; }
    version() { return 1; }
    httpMethod() { return "GET"; }
    group() { return "oauth" }
    description() {
        return (
            <p>
                This endpoint returns a fully populated OAuth client.
                This endpoint will only return public data for the OAuth app.
            </p>
        )
    }

    parameters() { return [
        new ResponseTypeParameter(),
        new ClientIDParameter(),
        new PermissionsParameter(),
        new RedirectURIParameter()
    ]; }
    examples() { return [
        new TokenResponse(),
        new UnsupportedResponseTypeResult(),
        new AccessDeniedResult(),
        new InvalidScopeResult()
    ]; }
}

class ResponseTypeParameter extends Parameter {
    name() { return "response_type"; }
    description() { return "The type of OAuth response that you'd like. Currently supported: 'code'"; }
    type() { return "query"; }
}

class ClientIDParameter extends Parameter {
    name() { return "client_id"; }
    description() { return "The OAuth client's id string."; }
    type() { return "query"; }
}

class PermissionsParameter extends Parameter {
    name() { return "permissions"; }
    description() { return "A space separated list of permissions to grant."; }
    type() { return "query"; }
}

class RedirectURIParameter extends Parameter {
    name() { return "redirect_uri"; }
    description() { return "The redirect URI for your app's requests."; }
    type() { return "query"; }
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