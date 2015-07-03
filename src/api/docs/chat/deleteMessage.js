import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResponse from "../../accessDeniedResult.js";
import ResourceMissingResponse from "../../resourceMissingResult.js";

export default class DeleteMessageMethod extends Method {
  httpMethod() { return "DELETE"; }
  version() { return 1; }
  uri() { return "/api/v1/chats/:id/message/:message" }
  description() {
    return "Hitting this endpoint removes a chat message from the channel's \
    chat. The message will be removed from the chat log and an event will go \
    out to chat servers, which in turn send events to connected users \
    instructings the clients to hide the message.";
  }
  parameters() { return [ new IDParameter(), new MessageParameter() ]; }
  examples() {
    return [
      new SuccesfulResponse(),
      new AccessDeniedResponse(),
      new ResourceMissingResponse("Channel"),
      new ResourceMissingResponse("Message")
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() {
    return "The channel numeric id of the channel that the message is in.";
  }
}

class MessageParameter extends Parameter {
  name() { return "message"; }
  description() { return "The UUID of the chat message you want to remove."; }
}

class SuccesfulResponse extends Example {
  httpCode() { return 200; }
  data() { return "Message deleted."; }
}
