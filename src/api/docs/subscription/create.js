import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ErrorfulResult from "../../errorfulResponse.js";
import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class CreateSubscriptionMethod extends Method {
  uri() { return "/api/v1/subscriptions"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  description() {
    return (
      <div>
        <p>
          "Hitting this endpoint creates and returns an unfulfilled transaction
          which, when completed, causes the user to be subscribed."
        </p>
        <p>
          "When this endpoint is hit we do create the subscription record, but
          set its expiresAt attribute to be the current date. When the
          transaction is paid, thirty days is added to the subscription
          (from the payment date)."
        </p>
      </div>
    );
  }

  parameters() { return [ new UserParameter(), new GroupParameter(),
                          new TermsParameter(), new SplatParameter() ]; }

  examples() { return [ new SuccesfulResult(), new ErrorfulResult(),
                        new AccessDeniedResult(),
                        new ResourceMissingResult("Channel") ]; }
}

class UserParameter extends Parameter {
  name() { return "user"; }
  description() { return "Numeric ID of the user to search for."; }
}

class GroupParameter extends Parameter {
  name() { return "group"; }
  description() {
    return (
      <div>
        <p>The subscription group.  It may be one of the following:</p>
        <table>
          <tr>
            <td><code>Premium</code></td>
            <td>A site-wide, Beam Pro subscription</td>
          </tr>
          <tr>
            <td><code>Subscriber</code></td>
            <td>
              "A subscription to a single channel. When selecting this group,
              you must also pass a numeric <code>channel</code> attribute
              indicating the channel ID to subscribe to."
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class TermsParameter extends Parameter {
  name() { return "terms"; }
  description() { return "Number of months to purchase the subscription for."; }
  optional() { return true; }
  default() { return 1; }
}

class SplatParameter extends Parameter {
  name() { return "*"; }
  description() { return "Additional parameters can be passed as required per " +
                         "group (see above)."; }
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
