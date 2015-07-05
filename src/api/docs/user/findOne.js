import Method from "../../method.js";
import Example from "../../example.js";

import ResourceMissingResult from "../../resourceMissingResult.js";
import { ExpandedSuccesfulExample } from "./succesfulExample.js";

export default class FindOneUserMethod extends Method {
  uri() { return "/api/v1/users/:id"; }
  version() { return 1; }
  httpMethod() { return "XXX"; }
  description() { return "Looks up information about a user."; }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new ExpandedSuccesfulExample(),
                        new ResourceMissingResult("User") ]; }
}
