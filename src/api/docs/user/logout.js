import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import { ExpandedSuccesfulExample } from "./succesfulExample.js";

export default class UserLogoutMethod extends Method {
  uri() { return "/api/v1/users/current"; }
  version() { return 1; }
  httpMethod() { return "DELETE"; }
  group() { return "user"; }

  description() { return "Destroys the current user session.  Has no effect when " +
                         "using OAuth."; }
  parameters() { return [ ]; }
  examples() { return [ new SuccesfulExample() ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() { return "User logged out."; }
}
