import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import ErrorfulResponse from "../../errorfulResponse.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class UpdatePreferencesMethod extends Method {
  uri() { return "/api/v1/users/:id/preferences"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }

  description() { return "Updates preferences relative to a given user. Requests " +
                         "can be made partially, we'll just \"extend\" the given " +
                         "data onto the existing preferences."; }
  parameters() { return [ new IDParameter(), new SplatParameter() ]; }
  examples() { return [ new SuccesfulExample(), new ErrorfulResponse(),
                        new AccessDeniedResult() ]; }
}

class SplatParameter extends Parameter {
  name() { return "*"; }
  description() {
    return (
      <div>
        <p>Many additional parameters can be passed, including:</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
            <tbody>{
              Object.keys(this.parameters()).map(name => {
                return (
                  <tr>
                    <td>{name}</td>
                    <td>{this.parameters()[name].default}</td>
                    <td>{this.parameters()[name].description}</td>
                  </tr>
                );
              })
            }</tbody>
          </thead>
        </table>
      </div>
    );
  }

  parameters() {
    return {
      "chat:colors": {
        default: true,
        type: "Boolean",
        description: "Whether chat name colors are enabled."
      },
      "chat:emotess": {
        default: true,
        type: "Boolean",
        description: "Whether chat emoticons will be displayed."
      },
      "chat:sounds:notification": {
        default: "woosh",
        type: "String",
        description: "The sound played when the user gets a notification in chat."
      },
      "chat:sounds:play": {
        default: true,
        type: "Boolean",
        description: "Whether to enable chat sounds at all."
      },
      "chat:sounds:volume": {
        default: 1,
        type: "Float",
        description: "The volume of chat sounds, expressed as a float between 0 and 1."
      },
      "chat:tagging": {
        default: true,
        type: "Boolean",
        description: "Whether to enable chat tagging."
      },
      "chat:timestamps": {
        default: true,
        type: "Boolean",
        description: "Whether to show timestamps on chat messages or not."
      },
    }
  }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "chat:colors": true,
      "chat:emotes": true,
      "chat:sounds:notification": "ping",
      "chat:sounds:play": true,
      "chat:sounds:volume": 1,
      "chat:tagging": false,
      "chat:timestamps": false
    }
  }
}
