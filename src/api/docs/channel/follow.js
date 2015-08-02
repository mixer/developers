import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class FollowMethod extends Method {
  description() { return "Follows a channel for the given user."; }
  httpMethod() { return "PUT"; }
  uri() { return "/api/v1/channels/:id/follow"; }
  group() { return "channels" }
  parameters() { return [ new IDParameter(), new UserParameter() ]; }
  examples() { return [ new SuccesfulResult(), new BadRequestResult(), new ForbiddenActionResult(), new MissingResult() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The channel ID you wish to follow."; }
}

class UserParameter extends Parameter {
  name() { return "user"; }
  description() { return "The user ID who wants to follow the channel."; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() { return "You are now following this channel."; }
}

class BadRequestResult extends Example {
  httpCode() { return 400; }
  data() { "You're already following that channel!"; }
}

class ForbiddenActionResult extends Example {
  httpCode() { return 403; }
  description() { return "This will occur if you don't have permission on the requested user or the user attempts to follow its own channel."; }
  data() { return "You are not permitted to perform that action."; }
}

class MissingResult extends Example {
  httpCode() { return 404; }
  data() { return "Channel not found."; }
}
