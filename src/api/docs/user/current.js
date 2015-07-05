import Method from "../../method.js";
import Example from "../../example.js";

import {ExpandedSuccesfulExample} from "./succesfulExample.js";

export default class CurrentUserMethod extends Method {
  uri() { return "/api/v1/users/current"; }
  version() { return 1; }
  httpMethod() { return "XXX"; }
  description() { return "Returns the user associated with the current auth. " +
                         "session (when using cookie-based sessions) or auth " +
                         "token (when using OAuth). This may be used as a means " +
                         "to check whether or not a user is currently logged in."; }
  parameters() { return []; }
  examples() { return [ new ExpandedSuccesfulExample(), new ErrorfulResult() ]; }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
  data() { return "User not logged in."; }
}
