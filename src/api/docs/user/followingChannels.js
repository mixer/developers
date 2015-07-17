import React from "react";

import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";

export default class ListChannelsFollowedMethod extends PaginatedMethod {
  uri() { return "/api/v1/users/:id/follows"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "user"; }

  description() { return (
    <p>
      This endpoint lists channels that the user is following with online
      channels first.
    </p>
  )}
  parameters() { return super.parameters().concat([ new IDParameter(),
                                                    new FieldsParameter() ]); }
  examples() { return [ new SuccesfulExample() ]; }
}

class FieldsParameter extends Parameter {
  name() { return "fields"; }
  description() { return (
    <p>
      Comma-delimited list of fields on models you want to return. If not
      passed, all available fields are returned.
    </p>
  )}
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      "allow_costream": "all",
      "audience": "G",
      "avatars": [ /* array of Resource object */ ],
      "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor delectus dolorum sequi, esse atque enim perspiciatis neque aliquid! Possimus officia id quasi veritatis nemo aliquam omnis sequi libero eum beatae.",
      "createdAt": new Date().toISOString(),
      "featured": false,
      "followers": 10,
      "hidden": false,
      "id": 20,
      "name": "Minecraft Rox",
      "online": true,
      "partnered": false,
      "subscribers": 2,
      "token": "connor4312",
      "type": "minecraft",
      "updatedAt": new Date().toISOString(),
      "user": 2,
      "viewers_total": 127
    }]
  }
}
