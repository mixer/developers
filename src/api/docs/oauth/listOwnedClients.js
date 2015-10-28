import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulResponse from "./successfulResponse.js";

export default class listOwnedOauthClientsMethod extends Method {
    uri() { return "/api/v1/users/:id/oauth/clients"; }
    version() { return 1; }
    httpMethod() { return "GET"; }
    group() { return "oauth" }
    description() {
        return (
            <p>
                This endpoint lists all OAuth clients owned by the user.
                This includes full details like the app's secret.
            </p>
        )
    }

    parameters() { return [ new IDParameter() ]; }
    examples() { return [ new SuccessfulResponse(), new AccessDeniedResponse() ]; }
}

class IDParameter extends Parameter {
    name() { return "id"; }
    description() { return "The numeric user id for whom to query the owned clients."; }
}

class AccessDeniedResponse extends Example {
    httpCode() { return 403; }
    data() { return; }
    description() { return "Returns when access is denied." }
}
