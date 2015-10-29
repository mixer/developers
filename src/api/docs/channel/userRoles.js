import React from "react";

import LoremIpsum from "lorem-ipsum";
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
    return super.parameters().concat([ new IDParameter() ]);
  }
  examples() {
    return [
      new SuccessfulResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of the channel to look up."; }
}

class SuccessfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      social: {
      },
      id: 1,
      username: "connor4312",
      verified: true,
      points: 66,
      bio: LoremIpsum({ count: 1, unit: "sentences" }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      groups: [
        {
          id: 2,
          name: "Mod"
        }
      ]
    }];
  }
}
