import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class CancelRoleMethod extends Method {
  uri() { return "/api/v1/subscriptions/:id"; }
  version() { return 1; }
  httpMethod() { return "DELETE"; }
  group() { return "subscription"; }

  description() {
    return (
      <div>
        <p>
          This endpoint causes a transactions to be created which has the effect
          of renewing a subscription, when payment is made.
        </p>
        <p>
          "A subscription does not have to be expired in order to renew it. Upon
          payment, the <code>expiresAt</code> date is updated to the greater of:
          30 days from the payment date, or 30 days from its current
          <code>expiresAt</code>."
        </p>
      </div>
    );
  }
  parameters() { return [ new ImmediateParameter() ]; }
  examples() { return [ new SuccesfulResult(), new AccessDeniedResult(),
                        new ResourceMissingResult("Subscription") ]; }
}

class ImmediateParameter extends Parameter {
  name() { return "immediate"; }
  description() { return "Whether the subscription should be cancelled " +
                         "immediately, or simply marked for deletion after the " +
                         "term ends."; }
  optional() { return true; }
  default() { return false; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() { return "Subscription cancelled."; }
}
