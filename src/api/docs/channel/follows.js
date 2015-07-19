import LoremIpsum from "lorem-ipsum";
import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class ChannelFollowsMethod extends PaginatedMethod {
  uri() { return "/api/v1/channels/:id/follow"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() {
    return "Lists the users who follow a channel, in the order that they followed";
  }
  group() { return "channels" }

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
   return "Specifies the order in which results should be displayed in the \
   format of one or more blocks in the form `attribute:direction`, separated by \
   commas.  For example, `attr1:desc,attr2:asc`.";
  }
  optional() { return true; }
  default() { return "undefined"; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      social: {
        twitter: "http://twitter.com/ConnorPeet",
        facebook: null,
        youtube: null,
        player: "http://player.me/connor"
      },
      username: "connor4312",
      verified: true,
      points: 66,
      bio: LoremIpsum({ count: 1, unit: "sentences" })
    }];
  }
}
