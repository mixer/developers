import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import ResourceMissingResult from "../../resourceMissingResult.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class ChangeAvatarMethod extends Method {
    uri() { return "/api/v1/users/:id/avatar"; }
    version() { return 1; }
    httpMethod() { return "GET"; }
    group() { return "user"; }

    description() { return "Used to get the user's avatar."; }
    parameters() { return [ new IDParameter(), new WidthParameter(), new HeightParameter() ]; }
    examples() { return [ new RedirectResult() ]; }
}

class WidthParameter extends Parameter {
    name() { return "w"; }
    type() { return "query"; }
    description() {
        return "Returns an image with the provided width in pixels.";
    }
    optional() { return true; }
}

class HeightParameter extends Parameter {
    name() { return "h"; }
    type() { return "query"; }
    description() {
        return "Returns an image with the provided height in pixels.";
    }
    optional() { return true; }
}

class RedirectResult extends Example {
    httpCode() { return 301; }
    description() { return "Redirects to the user's avatar, or the default one if the user doesn't have one set."; }
}
