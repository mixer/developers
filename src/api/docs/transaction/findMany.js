import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";

export default class FindManyTransactionMethod extends PaginatedMethod {
  uri() { return "/api/v1/users/:idtransactions"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "transaction"; }

  description() { return "Finds information about a single user's transactions."; }
  parameters() { return super.parameters().concat([ new IDParameter() ]); }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric user ID for which to gather transactions."; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
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
    }];
  }
}
