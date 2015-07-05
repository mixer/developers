import Method from "../../method.js";
import Example from "../../example.js";

import {ExpandedSuccesfulExample} from "./succesfulExample.js";

export default class RefreshUserMethod extends Method {
  uri() { return "/api/v1/current/refresh"; }
  version() { return 1; }
  httpMethod() { return "XXX"; }
  description() { return "We cache certain attributes of the user on the " +
                         "session. In some cases it is necessary to manually " +
                         "refresh, such as after a succesful Premium or Subscription " +
                         "purchase.  This endpoint allows you to do that."; }
  parameters() { return []; }
  examples() { return [ new ExpandedSuccesfulExample(), new ErrorfulResult() ]; }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
  data() { return "You must be authenticated to use this endpoint."; }
}
