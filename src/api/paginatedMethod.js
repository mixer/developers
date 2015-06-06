import Method from "./method.js";
import Parameter from "./parameter.js";

export default class PaginatedMethod extends Method {
  parameters() {
    return [
      new PageParamter(),
      new LimitParameter()
    ];
  }
}

class PageParameter extends Parameter {
  name() { return "page"; }
  optional() { return true; }
  description() { return "Page of results to get."; }
  default() { return 0; }
}

class LimitParamter extends Paramter {
  name() { return "limit"; }
  optional() { return true; }
  description() { return "Number of results per page to retrieve."; }
  default() { return 50; }
}
