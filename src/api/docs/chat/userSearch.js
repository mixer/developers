import Method from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import PaginatedMethod from "../../paginatedMethod.js";

export default class UserSearchMethod extends PaginatedMethod {
  uri() { return "/api/v1/chats/:id/search"; }
  version() { return 1; }
  description() { return "Searches for online users in a chat."; }
  group() { return "chat"; }

  method() { return "GET"; }
  parameters() {
    return super.parameters().concat([
      new IDParameter(), new UsernameParameter()
    ]);
  }
  examples() { return [ new SuccesfulResult() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The ID of the channel whose chat you want to search."; }
}

class UsernameParameter extends Parameter {
  name() { return "username"; }
  description() { return "The username to search by."; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        user_id: 1,
        user_name: Alice,
        user_roles: ["Owner"]
      },
      {
        user_id: 2,
        user_name: Bob,
        user_roles: ["User", "Mod"]
      }
    ];
  }
}
