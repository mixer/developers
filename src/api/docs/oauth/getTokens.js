import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import TokenResponse from "./tokenResponse.js";

export default class getOauthTokensMethod extends Method {
    uri() { return "/api/v1/oauth/token"; }
    version() { return 1; }
    httpMethod() { return "POST"; }
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
        new GrantTypeParameter(),
        new ClientIDParameter(),
        new RefreshTokenParameter(),
        new CodeParameter(),
        new RedirectURIParameter(),
        new ClientSecretParameter()
    ]; }
    examples() { return [
        new TokenResponse(),
        new UnsupportedGrantTypeResult(),
        new InvalidClientResult(),
        new InvalidGrantResult()
    ]; }
}

class GrantTypeParameter extends Parameter {
    name() { return "grant_type"; }
    description() { return "The type of OAuth grant that is being used. Select from: 'authorization_code' or 'from_refresh'"; }
    type() { return "body"; }
}

class ClientIDParameter extends Parameter {
    name() { return "client_id"; }
    description() { return "The OAuth client's id string."; }
    type() { return "body"; }
}

class RefreshTokenParameter extends Parameter {
    name() { return "refresh_token"; }
    description() { return "(Only if (grant_type == 'from_refresh)') The refresh token you want to generate new tokens from."; }
    type() { return "body"; }
}

class CodeParameter extends Parameter {
    name() { return "code"; }
    description() { return "(Only if (grant_type == 'authorization_code)') The auth code you want to generate tokens from."; }
    type() { return "body"; }
}

class RedirectURIParameter extends Parameter {
    name() { return "redirect_uri"; }
    description() { return "(Only if (grant_type == 'authorization_code)') The redirect URI for your app's requests."; }
    type() { return "body"; }
}

class ClientSecretParameter extends Parameter {
    name() { return "client_secret"; }
    description() { return "The OAuth client's secret key."; }
    type() { return "body"; }
}

class UnsupportedGrantTypeResult extends Example {
    httpCode() { return 400; }
    data() { return "unsupported_grant_type"; }
    description() { return "The grant_type you selected is not supported."; }
}

class InvalidClientResult extends Example {
    httpCode() { return 400; }
    data() { return "invalid_client"; }
    description() { return "The provided client/secret combo is incorrect."; }
}

class InvalidGrantResult extends Example {
    httpCode() { return 400; }
    data() { return "invalid_grant"; }
    description() { return "From expired tokens, to invalid code, anything goes with this one!"; }
}