import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class RenewSubscriptionMethod extends Method {
  uri() { return "/api/v1/subscriptions/:id"; }
  version() { return 1; }
  httpMethod() { return "PATCH"; }
  description() {
    return (
      <div>
        <p>
          This endpoint causes a transactions to be created which has the
          effect of renewing a subscription, when payment is made.
        </p>
        <p>
          A subscription does not have to be expired in order to renew it.
          Upon payment, the <code>expiresAt</code> date is updated to the
          greater of: 30 days from the payment date, or 30 days from its
          current <code>expiresAt</code>.
        </p>
      </div>
    );
  }

  parameters() { return [ new TermsParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult(),
                        new ResourceMissingResult("Subscription") ]; }
}

class TermsParameter extends Parameter {
  name() { return "terms"; }
  description() { return "Number of months to renew the subscription for."; }
  optional() { return true; }
  default() { return 1; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      createdAt: Date.now().toISOString(),
      currency_delta: -7.99,
      gateway: "internal",
      id: 12,
      note: "Purchase of the Premium role.",
      points_delta: 0,
      promotion: null,
      short_name: "Beam Subscription",
      status: "pending",
      user: 2
    }
  }
}
