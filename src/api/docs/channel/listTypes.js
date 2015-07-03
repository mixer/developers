import Method from "../../method.js";
import Example from "../../example.js";

export default class ListTypesMethod extends Method {
  httpMethod() { return "GET"; }
  version() { return 1; }
  uri() { return "/api/v1/types"; }
  description() {
    return (
      <div className="description">
        <p>
          Channels may belong to a single category (currently).  This endpoint \
          lists the categories that they may belong to.
        </p>
        <p>
          The <code>slug</code> is the identifying property used in other \
          endpoints for this resource.
        </p>
      </div>
    );
  }

  examples() { return [ new SuccesfulResult() ]; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    makeType = function (name) {
      return {
        cover: {},
        description: LoremIpsum({ count: 1, unit: "sentence" }),
        name: name,
        slug: name.toLowerCase().replace(" ", "-")
      }
    }

    return [ makeType("Minecraft"), makeType("Battlefield Hardline") ];
  }
}
