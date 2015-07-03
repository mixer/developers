import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class FindArchivedMethod extends Method {
  httpMethod() { return "GET"; }
  version() { return 1; }
  uri() { return "/api/v1/chats/:id/message"; }
  description() {
    return "With this endpoint, you can retrieve past messages for a channel. \
    Messages do expire after a TTL interval, but until they do they can be \
    retrieved here.";
  }
  parameters() {
    return [
      new IDParameter(),
      new StartParameter(),
      new EndParameter(),
      new LimitParameter()
    ];
  }
  examples() { return [ new SuccesfulResult() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The numeric channel ID."; }
}

class StartParameter extends Parameter {
  name() { return "start"; }
  description() {
    return "The start of the time range to query for messages. Should be given \
    as a unix timestamp with milliseconds.";
  }
  optional() { return true; }
  default() { return "Date.now()"; }
}

class EndParameter extends Parameter {
  name() { return "end"; }
  description() {
    return "The end of the time range to query for messages. Should be given as \
    a unix timestamp with milliseconds.";
  }
  optional() { return true; }
  default() { return "Date.now() - ttl"; }
}

class LimitParameter extends Parameter {
  name() { return "limit"; }
  description() {
    return "The maximim number of results to retrieve. If there are more results\
    in the range than can be shown, the first limit messages from the end time \
    will be displayed.";
  }
  optional() { return true; }
  default() { return 50; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        "channel": 2,
        "id": "b9b1ac30-dec5-11e4-ae00-1dea4d4cdac1",
        "message": [
          {
            "data": "Hello connor!",
            "type": "text"
          }
        ],
        "user_id": 1,
        "user_name": "Salsaman",
        "user_roles": [
          "Admin"
        ]
      },
      {
        "channel": 2,
        "id": "b964c4b0-dec5-11e4-ae00-1dea4d4cdac1",
        "message": [
          {
            "data": "Hey salsaman!",
            "type": "text"
          }
        ],
        "user_id": 2,
        "user_name": "connor4312",
        "user_roles": [
          "Owner"
        ]
      }
    ];
  }
}
