import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ErrorfulResponse from "../../errorfulResponse.js";
import AccessDeniedResponse from "../../AccessDeniedResponse.js";

export default class CheckoutMethod extends Method {
  uri() { return "/api/v1/shop/checkout"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  description() {
    return "This endpoints takes items and quantities that you want to " +
           "purchase and returns a transcation that, when paid, will fulfill " +
           "the order.";
  }
  parameters() { return [ new ItemsParameter() ]; }
  examples() { return [ new SuccesfulExample(), new ErrorfulResponse(), new AccessDeniedResponse() ]; }
}

class ItemsParameter extends Parameter {
  name() { return "items"; }
  description() { return "Items should be an array of objects in the following " +
                         "format, using the items ids you want to purchase:"; }
  example() {
    return [
      { "id": 1, "quantity": 3},
      { "id": 2, "quantity": 1},
    ];
  }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      createdAt: Date.now().toISOString(),
      currency_delta: -7.99,
      gateway: "internal",
      id: 12,
      note: "Purchase of items from the beam shop.",
      points_delta: 0,
      promotion: null,
      short_name: "Beam Shop Items",
      status: "pending",
      user: 2
    }
  }
}
