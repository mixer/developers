import React from "react";

import Method from "../../method.js";
import Example from "../../example.js";
import Parameter from "../../parameter.js";

export default class UserListMethod extends Method {
  uri() { return "/api/v1/chats/:id/users"; }
  description() {
    return (
      <p>Displays a list of online users in the chat, sorted in descending
      order by role.</p>
    );
  }
  group() { return "chat"; }

  version() { return 1; }
  httpMethod() { return "GET"; }
  parameters() {
    return [
      new IDParameter(),
      new PageParameter(),
      new LimitParameter()
    ];
  }
  examples() { return [ new SuccesfulResult() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The ID of the channel whose chat you want to list."; }
}

class PageParameter extends Parameter {
  name() { return "page"; }
  description() { return "The page of results to get."; }
  optional() { return true; }
  default() { return 0; }
}

class LimitParameter extends Parameter {
  name() { return "limit"; }
  description() { return "Number of results per page to retrieve."; }
  optional() { return true; }
  default() { return 50; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        userName: "Connor4312",
        userRoles: ["Owner"],
        userId: 1
      },
      {
        userName: "ttaylorr",
        userRoles: ["Mod", "User"],
        userId: 2
      }
    ];
  }
}
