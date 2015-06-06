import Method from "../../method.js";
import Example from "../../example.js";
import Parameter from "../../parameter.js";
import LoremIpsum from "lorem-ipsum";

export default class AbstractAchievementMethod extends Method {
  version() { return 1; }
  httpMethod() { return "GET"; }
  examples() { return [ new SuccesfulExample(), new ErrorfulExample() ]; }
  parameters() { return [ new IDParameter() ]; }
}

class IDParameter extends Parameter {
  constructor() {
    super();
  }

  name() { return "id"; }
  description() { return "Numeric user ID to get the achievements for."; }
}

class SuccesfulExample extends Example {
  constructor() {
    super();
  }

  httpCode() { return 200; }
  data() {
    return [
      {
        description: LoremIpsum({ count: 1, unit: 'sentences' }),
        earned: false,
        id: 1,
        name: "StalkerPro",
        progress: 0.12,
        slug: "stalker-pro",
        updatedAt: new Date().toISOString(),
        user: 2
      },
      {
        description: LoremIpsum({ count: 1, unit: "sentences" }),
        earned: true,
        id: 2,
        name: "Stalker",
        progress: 1,
        slug: "stalker",
        updatedAt: new Date().toISOString(),
        user: 2
      }
    ];
  }
}

class ErrorfulExample extends Example {
  constructor() {
    super();
  }

  httpCode() { return 403; }
  data() {
    return "You are not permitted to preform that action.";
  }
}

