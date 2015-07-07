import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class DeleteResource extends Method {
  uri() { return "/api/v1/resources/:id"; }
  version() { return 1; }
  httpMethod() { return "DELETE"; }
  group() { return "resource"; }

  description() {
    return (
      <div>
        <p>
          This endpoint deletes a given resource.
        </p>
        <p>
          For default users, they are only permitted to delete resources that
          they alone have access to. If the resource can be accessed by a group
          or another user, they will not be permitted to delete it.
        </p>
      </div>
    );
  }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [
    new SuccesfulExample(),
    new AccessDeniedResult(),
    new ResourceMissingResult("Resource")
  ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The resource ID to delete"; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() { return "Resource deleted"; }
}
