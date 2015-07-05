import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class FindOneSubscriptionMethod extends Method {
  uri() { return "/api/v1/subscriptions/:id"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "This retrieves a single subscription by its ID."; }
  group() { return "subscription"; }

  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulResult(), new AccessDeniedResult(),
                        new ResourceMissingResult("Subscription") ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The numeric ID of the subscriptions to look up."; }
}

class SuccesfulResult extends Example {
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
