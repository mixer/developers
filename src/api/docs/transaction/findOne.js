import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class FindOneTransactionMethod extends Method {
  uri() { return "/api/v1/transactions/:id"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "transaction"; }

  description() { return "Finds information about a single transaction."; }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult(),
                        new ResourceMissingResult("Transaction") ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric user ID of the transaction to get."; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      createdAt: Date.now().toISOString(),
      currency_delta: -7.99,
      gateway: "internal",
      id: 9,
      note: "Purchase of the Premium role.",
      points_delta: 0,
      promotion: null,
      reference: "",
      short_name: "Beam Subscription",
      status: "pending",
      user: 2
    }
  }
}
