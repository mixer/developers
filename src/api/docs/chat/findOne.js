import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ResourceMissingRepsonse from "../../resourceMissingResult.js";

export default class ChatFindOneMethod extends Method {
  httpMethod() { return "GET"; }
  uri() { return "/api/v1/chats/:id"; }
  description() {
    return (
      <div className="description">
        <p>
          This endpoint is session-based only. It will not work over OAuth.
        </p>
        <p>
          It prepares the user to join a chat. It returns chat settings,
          available chat servers, and an authnetication key that the user
          (if authenticated) should use to authneticate with the chat servers
          over websockets.
        </p>
        <p>
          If there is no authenticated user, then an authkey will not be sent.
          The client will be able to connect to a server and view chat, but will
          not be able to take any actions or participate.
        </p>
      </div>
    );
  }
  parameters() { return [ new IDParameter() ]; }
  examples() {
    return [
      new SuccesfulResponse(),
      new ResourceMissingRepsonse("Channel")
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() {
    return "The channel numeric id of the channel whose chat you want to join.";
  }
}

class SuccesfulResponse extends Example {
  httpCode() { return 200; }
  data() {
    return {
      authkey: "ce61c79f148fed06fd16fcb6e56f5897",
      endpoints: [
        "wss://127.0.0.1:1338"
      ],
      linksAllowed: true,
      linksClickable: true,
      roles: [ "Owner" ],
      slowchat: 0.5,
      permissions: [
        'connect',
        'chat',
        'bypass_links',
        'bypass_slowchat',
        'remove_message',
        'change_ban',
        'edit_options',
        'change_role',
        'clear_messages'
      ]
    }
  }
}
