import React from "react";

import Method from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import PaginatedMethod from "../../paginatedMethod.js";

export default class UserSearchMethod extends PaginatedMethod {
  uri() { return "/api/v1/chats/:id/search"; }
  version() { return 1; }
  description() {
    return (
      <div className="description">
        <p>
          With this endpoint, you can search the chat for a user using the query parameters on offer. Hitting 
          then endpoint without parameters will result in an empty array being returned.
        </p>
        <p>
          For example appending the URL with <code>?username=connor4312</code> will show the details for user 
          if they are in the channel, otherwise an empty array will be returned.
        </p>
      </div>
    );
  }
  group() { return "chat"; }

  httpMethod() { return "GET"; }
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
    return [{
      userName: "Alice",
      userRoles: ["Owner"],
      userId: 1
    }];
  }
}
