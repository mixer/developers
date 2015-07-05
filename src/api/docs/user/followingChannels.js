import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class ListChannelsFollowedMethod extends PaginatedMethod {
  uri() { return "/api/v1/users/:id/follows"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "This endpoint lists channels that the user is following " +
                        "in descending order from the dat that they were followed " +
                        "at"; }
  parameters() { return super.parameters().concat([ new IDParamter(),
                                                    new FieldsParameter() ]); }
  examples() { return [ new SuccesfulExample() ]; }
}

class FieldsParameter extends Parameter {
  name() { return "XXX"; }
  description() { return "XXX"; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      "allow_costream": "all",
      "audience": "G",
      "avatars": [ /* array of Resource object */ ],
      "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor delectus dolorum sequi, esse atque enim perspiciatis neque aliquid! Possimus officia id quasi veritatis nemo aliquam omnis sequi libero eum beatae.",
      "createdAt": "2014-11-20T00:48:01.000Z",
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
      "updatedAt": "2014-11-20T00:48:01.000Z",
      "user": 2,
      "viewers_total": 127
    }]
  }
}
