import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import ResourceMissingRepsonse from "../../resourceMissingResult.js";

export default class ChatFindOneMethod extends Method {
  httpMethod() { return "GET"; }
  uri() { return "/api/v1/chats/:id"; }
  group() { return "chat"; }
  description() {
    return (
      <div className="description">
        <p>
          This endpoint is session-based only. It will not work over OAuth.
        </p>
        <p>
          It prepares the user to join a chat. It returns chat settings,
          available chat servers, and an authentication key that the user
          (if authenticated) should use to authenticate with the chat servers
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

  parameters() {
    return [
      new IDParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulResponse(),
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

class SuccessfulResponse extends Example {
  httpCode() { return 200; }
  data() {
    return {
      endpoints: [
        "wss://chat2-dal07.beam.pro:443",
        "wss://chat1-dal07.beam.pro:443"
      ],
      authkey: "00af3f83608ee753e95e26ee55e796fe",
      permissions: [
        "bypass_links",
        "bypass_slowchat",
        "remove_message",
        "change_ban",
        "clear_messages",
        "giveaway_start",
        "poll_vote",
        "poll_start",
        "connect",
        "chat"
      ]
    }
  }
}
