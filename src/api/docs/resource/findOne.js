import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class FindOneResource extends Method {
  uri() { return "/api/v1/resources/:id"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "Looks up a single resource."; }
  group() { return "resource"; }

  parameters() {
    return [
      new IDParameter()
    ];
  }
  examples() { return [
    new SuccessfulExample(),
    new AccessDeniedResult(),
    new ResourceMissingResult("Resource")
  ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The resource ID to delete"; }
}

class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "id": 2450,
      "resourceId": null,
      "resourceType": null,
      "status": "active",
      "cancelled": null,
      "expiresAt": new Date().toISOString(),
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString(),
      "deletedAt": null,
      "group": 12,
      "user": 693
    };
  }
}
