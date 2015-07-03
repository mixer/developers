import Method from "../../method.js";
import Example from "../../example.js";
import Parameter from "../../parameter.js";

export default class UserListMethod extends Method {
  uri() { return "/api/v1/chats/:id/users"; }
  description() {
    return "Displays a list of online users in the chat, sorted in descending \
    order by role.";
  }
  version() { return 1; }
  method() { return "GET"; }
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
  description() { return "Number of results per page to retreive."; }
  optional() { return true; }
  default() { return 50; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        user_id: 1,
        user_name: "Connor4312",
        user_roles: ["Owner"]
      },
      {
        user_id: 2,
        user_name: "ttaylorr",
        user_roles: ["User", "Mod"]
      }
    ];
  }
}
