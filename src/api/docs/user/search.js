import React from "react";

import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class UserSearchMethod extends PaginatedMethod {
  uri() { return "/api/v1/users/search"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "user"; }

  description() { return (
    <p>
      Searches for a user based on the prefix of their username.
    </p>
  )}
  parameters() { return super.parameters().concat([ new QueryParameter() ]); }
  examples() { return [ new SuccesfulResult() ]; }
}

class QueryParameter extends Parameter {
  name() { return "query"; }
  description() { return (
    <p>
      The prefix of the username to query with. Must be at least two characters
      long, or an empty array will be returned.
    </p>
  )}
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      { username: "jamburger", id: 1 },
      { username: "jamydev", id: 2 },
      { username: "jambro1337", id: 3 }
    ];
  }
}
