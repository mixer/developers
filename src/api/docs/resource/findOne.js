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
  data() {
    return {
      createdAt: new Date().toISOString(),
      id: 36,
      meta: {},
      relid: 0,
      remote_path: "img/covers/wow-cover.jpg",
      store: "nil",
      type: "type:cover",
      updatedAt: new Date().toISOString(),
      url: "https://lab.beam.pro/img/covers/wow-cover.jpg"
    };
  }
}
