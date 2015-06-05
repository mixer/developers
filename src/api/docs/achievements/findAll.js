import Method from "../../method.js";
import Example from "../../example.js";
import Parameter from "../../parameter.js";

export default class FindAllAchievementsMethod extends Method {
  constructor() {
    super();
  }

  uri() { return "./api/v1/achievements/"; }
  description() { return "This lists all achievements that are possible to earn."; }
  version() { return 1; }
  httpMethod() { return "GET"; }

  examples() {
    return [ new SuccesfulExample(), new ErrorfulExample() ];
  }

  parameters() {
    return [ new IDParameter() ];
  }
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
    return ({[
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        earned: false,
        id: 1,
        name: "StalkerPro",
        progress: 0.12,
        slug: "stalker-pro",
        updatedAt: "2015-02-03T15:44:02.000Z",
        user: 2
      },
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        earned: true,
        id: 2,
        name: "Stalker",
        progress: 1,
        slug: "stalker",
        updatedAt: "2015-02-03T15:44:02.000Z",
        user: 2
      }
    ]});
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
