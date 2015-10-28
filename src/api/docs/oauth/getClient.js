import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulResponse from "./successfulResponse.js";

export default class getOauthClientMethod extends Method {
    uri() { return "/api/v1/oauth/clients/:id"; }
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

    parameters() { return [ new IDParameter() ]; }
    examples() { return [ new SuccessfulResponse(), new ErrorfulResult() ]; }
}

class IDParameter extends Parameter {
    name() { return "id"; }
    description() { return "The id string for the OAuth application."; }
}

class ErrorfulResult extends Example {
    httpCode() { return 404; }
    data() { return "Client not found."; }
}
