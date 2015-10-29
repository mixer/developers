import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResponse from "../../accessDeniedResult.js";
import ResourceMissingResponse from "../../resourceMissingResult.js";

export default class ClearChatMethod extends Method {
  httpMethod() { return "DELETE"; }
  version() { return 1; }
  uri() { return "/api/v1/chats/:id/message" }
  group() { return "chat"; }
  description() {
    return (
      <p>
        Hitting this endpoint removes all chat messages from the channel's
        chat. An event will go out to chat servers, which in turn send
        events to connected clients telling them to remove all cached messages.
      </p>
    );
  }

  parameters() { return [ new IDParameter() ]; }
  examples() {
    return [
      new SuccessfulResponse(),
      new AccessDeniedResponse(),
      new ResourceMissingResponse("Channel"),
      new ResourceMissingResponse("Message")
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() {
    return "The numeric id of the channel you want to clear the chat for.";
  }
}

class SuccessfulResponse extends Example {
  httpCode() { return 200; }
  data() { return "Chat messages have been cleared."; }
}
