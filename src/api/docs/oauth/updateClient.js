import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulResponse from "./successfulResponse.js";

export default class getOauthClientMethod extends Method {
    uri() { return "/api/v1/oauth/clients/:id"; }
    version() { return 1; }
    httpMethod() { return "PUT"; }
    group() { return "oauth" }
    description() {
        return (
            <p>
                Update data for the provided OAuth client.
                Currently this doesn't allow the updating
                of the logo.
            </p>
        )
    }

    parameters() { return [
        new IDParameter(),
        new NameParameter(),
        new WebsiteParameter(),
        new HostsParameter(),
        new SecretParameter(),
        new LogoParameter()
    ]; }
    examples() { return [
        new SuccessfulResponse(),
        new ErrorfulResult(),
        new NotFoundResult()
    ]; }
}

class IDParameter extends Parameter {
    name() { return "id"; }
    description() { return "The id string for the OAuth application."; }
}

class NameParameter extends Parameter {
    name() { return "name"; }
    description() { return "The name for the OAuth client."; }
    type() { return "body"; }
}

class WebsiteParameter extends Parameter {
    name() { return "website"; }
    description() { return "The website for the OAuth client."; }
    type() { return "body"; }
}

class HostsParameter extends Parameter {
    name() { return "hosts"; }
    description() { return "An array of allowed hosts. Wildcards can be used to allow a bigger range of (sub)domains."; }
    type() { return "body"; }
}

class SecretParameter extends Parameter {
    name() { return "secret"; }
    description() { return "A boolean that defines whether to generate a secret token or not."; }
    type() { return "body"; }
}

class LogoParameter extends Parameter {
    name() { return "logo"; }
    description() { return "The logo file for the OAuth client."; }
    type() { return "body"; }
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

class NotFoundResult extends Example {
    httpCode() { return 404; }
    data() { return "Client not found."; }
}