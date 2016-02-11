import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class FindOneResource extends Method {
  uri() { return "/api/v1/users/:id/resources"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "resource"; }
  description() {
    return (
      <p>
        This shows resources that the user has access to. Access is granted
        both through the user's group, for shared resources (like default
        channel covers), and through the user directly (like user avatar and
        channel thumbnails).
      </p>
    );
  }

  parameters() {
    return [
      new IDParameter(),
      new TypeParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulExample(),
      new AccessDeniedResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The resource ID to delete"; }
}

class TypeParameter extends Parameter {
  name() { return "type"; }
  description() { return "Filter the results to a given type (if present)"; }
  optional() { return true; }
  default() { return undefined; }
}

class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        "id": 2450,
        "group": 12,
        "resourceId": null,
        "resourceType": null,
        "status": "active",
        "cancelled": null,
        "expiresAt": new Date().toISOString(),
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "Group": {
          "id": 12,
          "name": "Pro"
        }
      }
    ];
  }
}
