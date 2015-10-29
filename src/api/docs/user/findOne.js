import Method from "../../method.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import ResourceMissingResult from "../../resourceMissingResult.js";
import ExpandedSuccessfulExample from "./expandedSuccessfulExample.js";

export default class FindOneUserMethod extends Method {
  uri() { return "/api/v1/users/:id"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "user"; }
  description() { return "Looks up information about a user."; }

  parameters() {
    return [
      new IDParameter()
    ];
  }
  examples() {
    return [
      new ExpandedSuccessfulExample(),
      new ResourceMissingResult("User")
    ];
  }
}
