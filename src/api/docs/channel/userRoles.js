import React from "react";

import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class UserRolesMethod extends PaginatedMethod {
  uri() { return "/api/v1/channels/:id/users"; }
  httpMethod() { return "GET"; }
  version() { return 1; }
  group() { return "channels"; }

  description() {
    return (
      <p>
        This endpoint lists users who have some particular role on the
        specific channel. This includes subscribers, banned users, and moderators.
        It does not include global roles like premiums, developers, or admins. The
        results will include the basic user model, with a "groups" array listing
        the groups that the user belongs to on that channel.
      </p>
    )
  }

  parameters() {
    return super.parameters().concat([ new IDParamter() ]);
  }

  examples() { return [ new SuccesfulResult() ]; }
}

class IDParamter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of the channel to look up."; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        createdAt: new Date().toISOString(),
        displayName: "Connor",
        email: "connor@example.com",
        groups: [
          {
            id: 2,
            name: "Mod"
          }
        ],
        id: 1,
        points: 2,
        updatedAt: new Date().toISOString(),
        username: "connor4312"
      }];
  }
}
