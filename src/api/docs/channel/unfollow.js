import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class UnfollowUserMethod extends Method {
  httpMethod() { return "DELETE"; }
  uri() { return "/api/v1/channels/:id/follow"; }
  description() { return "Unfollows a channel for the given user."; }
  group() { return "channels"; }

  parameters() { return [ new IDParameter(), new UserParameter() ]; }
  examples() {
    return [
      new SuccesfulResult(),
      new AccessDeniedResult(),
      new ResourceMissingResult("Channel")
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The channel ID you wish to follow."; }
}

class UserParameter extends Parameter {
  name() { return "user"; }
  description() { return "The user ID who wants to unfollow the channel"; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() { return "You are no longer following this channel."; }
}
