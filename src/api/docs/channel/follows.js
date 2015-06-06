import PaginatedMethod from ".././paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class ChannelFollowsMethod extends Method {
  uri() { return "/api/v1/channels/:id/follow"; }
  version() { return 1; }
  description() {
    return "Lists the users who follow a channel, in the order that they \
    followed.";
  }

  parameters() {
    return super.parameters().concat([
      new IDParameter(),
      new FieldsParameter(),
      new SortParameter()
    ]);
  }

  examples() { return [ new SuccesfulExample() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of the channel to look up."; }
}

class FieldsParameter extends Parameter {
  name() { return "fields"; }
  description() {
    return "Comma-delimited list of fields on models you want to return.  If \
    not passed, all available fields are returned.";
  }
  optional() { return true; }
  default() { return "undefined"; }
}

class SortParameter extends Parameter {
  name() { return "sort"; }
  description() {
   return "Specifies the order in which results shouldbe dispalyed in the \
   format of one or more blocks in the form `attirbute:direction`, seperated by \
   commas.  For example, `attr1:desc,attr2:asc`.";
  }
  optional() { return true; }
  default() { return "undefined"; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      avatars: [],
      channel: 2
      display_name: "ConnorPeet",
      id: 2,
      points: 64,
      social: {
        facebook: null,
        twitter: "ConnorPeet",
        youtube: null
      },
      username: "connor4312",
      verified: 1
    }];
  }
}
