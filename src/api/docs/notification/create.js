import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ErrorfulResponse from "../../errorfulResponse.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class SomeAPIMethod extends Method {
  uri() { return "/api/v1/notifications"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  description() {
    return (
      <div>
        <p>
          "This creates a new notification manually. Beam automatically creates
          notifications on events such as when new channel follower is gained,
          but it may be useful for create notifications manually."
        </p>
        <p>
          "Currently permissions are set up so that, in the context of a regular
          user, you may only create notifications for that one user."
        </p>
      </div>
    );
  }
  parameters() { return [ new UserParameter(), new TypeParameter(), new DataParameter()  ]; }
  examples() { return [ new SuccesfulExample(), new ErrorfulResponse(), new AccessDeniedResult() ]; }
}

class UserParameter extends Parameter {
  name() { return "user"; }
  description() { return "User ID to notify"; }
}

class TypeParameter extends Parameter {
  name() { return "type"; }
  description() { return "The notification type"; }
}

class DataParameter extends Parameter {
  name() { return "user"; }
  description() { return "Metadata that you'd like to attach to the notification"; }
  optional() { return true; }
  default() { return null; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      createdAt: Date.now().toISOString(),
      data: {
          foo: "bar"
      },
      readAt: null,
      type: "custom:event",
      user: 2
    };
  }
}
