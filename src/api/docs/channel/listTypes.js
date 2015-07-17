import React from "react";

import LoremIpsum from "lorem-ipsum";
import Method from "../../method.js";
import Example from "../../example.js";

export default class ListTypesMethod extends Method {
  httpMethod() { return "GET"; }
  version() { return 1; }
  uri() { return "/api/v1/types"; }
  group() { return "channels" }
  description() {
    return (
      <div className="description">
        <p>
          Channels may belong to a single category (currently).  This endpoint
          lists the categories that they may belong to.
        </p>
        <p>
          The <code>id</code> is the identifying property used in other
          endpoints for this resource.
        </p>
      </div>
    );
  }

  parameters() { return []; }
  examples() { return [ new SuccesfulResult() ]; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    let makeType = function (id, name, parent) {
      return {
        id: id,
        name: name,
        parent: parent,
        description: LoremIpsum({ count: 1, unit: "sentence" }),
        source: "player.me"
        viewersCurrent: 0,
        online: 0
      }
    }

    return [ makeType(1, "Minecraft", "Games"),
             makeType(2, "Battlefield Hardline", "Games") ];
  }
}
