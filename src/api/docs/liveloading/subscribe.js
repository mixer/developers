import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedResult from "../../accessDeniedResult.js";

export default class LiveloadingSubscribe extends Method {
  uri() { return "/api/v1/live"; }
  version() { return 1; }
  httpMethod() { return "PUT"; }
  group() { return "liveloading"; }
  description() {
    return (
      <div>
        <p>
          Using this endpoint, you can subscribe to new events. You'll receive a
          standard Comet response back over the websocket. Subsequently, events
          will be pushed back down the socket directly.
        </p>
        <p>
          To subscribe to an event, a client sends a request to this endpoint.
          The body should contain a slug, will be sent to an interface. The
          interface is responsible for doing all the mechanical work on the
          backend, which eventually subscribes to one or many events on Redis,
          which is our primary means of pubsub within our network. When an event
          comes in that matches one the interface is listening to, the interface
          is responsible for taking that data and sending it back down to the
          user.
        </p>
        <p>
          tl;dr the \"slug\" you subscribe to determines -- but is not itself --
          the events you can expect to receive on the client.
        </p>

        <h2>Available Interfaces</h2>
        <table>
          <tr>
            <td><code>channel:[:id]:update</code></td>
            <td>
              You'll get an event sent down that matches the slug, containing
              changes on the channel body. The event may not necessarily include
              the entire channel resource. For example, when a channel goes
              online, an event with the key online going to true is sent.
            </td>
          </tr>
          <tr>
            <td><code>channel:[:id]:status</code></td>
            <td>
              Subscribes to the online status of a channel. You'll get events
              sent down named <code>chat:[id]:StartStreaming</code> and 
              <code>chat:[id]:StopStreaming</code>.
            </td>
          </tr>
          <tr>
            <td><code>channel:[:id]:followed</code></td>
            <td>
              Sent when a user follows or unfollows a channel. The body will
              contain:

              An attribute following - true if the user just followed the
              channel, false if they unfollowed, and user - the user object who
              just followed the channel.
            </td>
          </tr>
          <tr>
            <td><code>user:[:id]:followed</code></td>
            <td>
              <p>
                Sent when the user follows or unfollows a channel.
                The body will contain:
              </p>
              <ul>
                <li>
                  An attribute following - true if the user just followed the
                  channel, false if they unfollowed,
                </li>
                <li>
                  and channel - the channel object the user just followed.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><code>channel:[:id]:subscribed</code></td>
            <td>
              Sent when a user subscribes to the channel. The body will
              contain the user object who just subscribed to the channel.
            </td>
          </tr>
          <tr>
            <td><code>user:[:id]:subscribed</code></td>
            <td>
              Sent when the user subscribes to a channel. The body will
              contain the channel ID that they just subscribed to.
            </td>
          </tr>
          <tr>
            <td><code>user:[:id]:achievement</code></td>
            <td>
              Sent when a user achievement earning is updated. The body is
              simply an \"earning\" record as returned in the achievement user
              listing endpoint.
            </td>
          </tr>
        </table>
      </div>
    );
  }

  parameters() {
    return [
      new SlugParameter(),
      new MetaParameter()
    ];
  }
  examples() { return [
    new SuccessfulResponse(),
    new AccessDeniedResult(),
    new BadRequest(),
    new TooManyRateLimit(),
    new DuplicateRateLimit()
  ]; }
}

class SlugParameter extends Parameter {
  name() { return "slug"; }
  description() { return "Passed as a string or array of strings. The name(s) of the interface you wish to subscribe to (see above)."; }
}

class MetaParameter extends Parameter {
  name() { return "meta"; }
  description() { return "Additional data which can be passed as needed to the interface."; }
  optional() { return true; }
}

class SuccessfulResponse extends Example {
  httpCode() { return 200; }
  data() { return "Subscribed successfully."; }
}

class BadRequest extends Example {
  httpCode() { return 400; }
  data() { return "Standard invalid request"; }
}

class TooManyRateLimit extends Example {
  httpCode() { return 420; }
  data() { return "You are subscribed to too many events!"; }
}

class DuplicateRateLimit extends Example {
  httpCode() { return 420; }
  data() { return "You are already subscribed to this event!"; }
}
