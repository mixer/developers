import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class SomeAPIMethod extends Method {
  uri() { return "/api/v1/transactions/:id/authorize"; }
  version() { return 1; }
  httpMethod() { return "ANY"; }
  description() {
    return (
      <div>
        <p>"This serves as a single endpoint for handling transaction authorization."</p>
        <p>"On initial request it's usually desired to set the gateway to use."</p>
      </div>
    );
  }
  parameters() { return [ new IDParameter(), new GatewayParameter(),
                          new SplatParameter() ]; }
  examples() { return [ new CompleteExample(), new NeedsAuthorizationExample(),
                        new PaymentFailedExample() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric user ID of the transaction to authorize."; }
}

class GatewayParameter extends Parameter {
  name() { return "gateway"; }
  optional() { return true; }
  default() { return "internal"; }

  description() {
    return (
      <div>
        <p>Gateway to use to run the transaction.  Available gateways:</p>
        <table>
          <tr>
            <td><code>internal</code></td>
            <td>
              Default gateway.  Processes point payments, but will not process
              monetary transaction.  No aditional parameters are required.
            </td>
          </tr>
          <tr>
            <td><code>paypal</code></td>
            <td>
              PayPal Express Checkout gateway.  No additional parameters are
              required.
            </td>
          </tr>
          <tr>
            <td><code>ccbill</code></td>
            <td>
              CCBill credit card payment gateway.  No additional parameters
              are required.
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class SplatParameter extends Parameter {
  name() { return "*"; }
  optional() { return true; }
  description() { return "Additional parameters can be passed as required per " +
                         "gateway (see above)."; }
}

class CompleteExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      status: "success"
    }
  }
}

class NeedsAuthorizationExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      status: "redirect",
      url: "https://paypal.com/complete-this-transaction"
    }
  }
}


class PaymentFailedExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      status: "error",
      message: "Invalid credit card number.",
      retry: true
    }
  }
}
