import Method from "../../method.js";
import Example from "../../example.js";
import LoremIpsum from "lorem-ipsum";

export default class AbstractAchievementMethod extends Method {
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "achievements"; }

  examples() {
    return [
      new SuccessfulExample(),
      new ErrorfulExample()
    ];
  }
  parameters() {
    return [];
  }
}

class SuccessfulExample extends Example {
  constructor() {
    super();
  }

  httpCode() { return 200; }
  data() {
    return [
      {
        slug: "helper-pro",
        name: "HelperPro",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        points: 0
      },
      {
        slug: "thousand-beams",
        name: "ThousandBeams",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        points: 0
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
    return "You are not permitted to perform that action.";
  }
}
