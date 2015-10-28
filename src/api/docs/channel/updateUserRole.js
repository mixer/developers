import React from "react";

import LoremIpsum from "lorem-ipsum";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class UpdateUserRoleMethod extends Method {
  httpMethod() { return "PATCH"; }
  version() { return 1; }
  uri() { return "/api/v1/channels/:id/users/:user"; }
  group() { return "channels"; }
  description() {
    return (
      <div className="description">
        <p>
          This endpoint updates roles a user has in one channel. What you can
          update is contextual, based on your current authentication level.
          Generally:
        </p>
        <ul>
          <li>
            You can add and remove people from groups "under" your level (Owners
            can add and remove Mod roles),
          </li>
          <li>
            but you cannot modify groups at or above your role (Mods cannot mod
            and de-mod others).
          </li>
          <li>
            Additionally, paid roles (Premium and Subscriber) cannot be modified,
          </li>
          <li>
            and the dominant role of your target must be less than your own role
            (Mods cannot modify any roles on the Owner, Owners cannot modify any
            roles on site Admins).
          </li>
        </ul>
      </div>
    );
  }

  parameters() {
    return [
      new IDParameter(),
      new UserParameter(),
      new AddParameter(),
      new RemoveParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulResult(),
      new ErrorfulResult(),
      new AccessDeniedResult(),
      new NotFoundResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of the channel."; }
}

class UserParameter extends Parameter {
  name() { return "user"; }
  description() { return "Numeric ID of the user or their username"; }
}

class AddParameter extends Parameter {
  name() { return "add"; }
  description() {
    return "Array of groups names you want to add to the user.  For example, to \
    ban a user, you would add the \"Banned\" role.";
  }
  optional() { return true; }
  default() { return []; }
}

class RemoveParameter extends Parameter {
  name() { return "remove"; }
  description() {
    return "Array of groups names you want to remove from the user.";
  }
  optional() { return true; }
  default() { return []; }
}

class SuccessfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      social: {
        twitter: "http://twitter.com/ConnorPeet",
        facebook: null,
        youtube: null,
        player: "http://player.me/connor"
      },
      id: 20,
      username: "connor4312",
      verified: true,
      points: 66,
      bio: LoremIpsum({ count: 1, unit: "sentences" }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      groups: [
        2
      ]
    };
  }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
}

class AccessDeniedResult extends Example {
  httpCode() { return 403; }
  data() { return "Access denied."; }
}

class NotFoundResult extends Example {
  httpCode() { return 404; }
  data() { return "User not found."; }
}
