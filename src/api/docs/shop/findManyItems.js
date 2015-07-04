import Method from "../../method.js";
import Parameter from "../../parameter.js";

import ItemExample from "./itemExample.js";
import OrderParameter from "../../orderParameter.js";

export default class FindManyItemsMethod extends Method {
  constructor() {
    super();
    this.orderAttributes = [
      "id", "title", "description", "purchases", "currency_cost", "points_cost",
      "max_per_user", "max_quantity", "createdAt", "updatedAt"
    ];
  }

  uri() { return "/api/v1/shop/categories/:id/items"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() { return "This lists the items that belong to a particular " +
                         "category. Keep in mind that items can belong to " +
                         "multiple categories, so there may be overlap if you " +
                         "request multiple categories."; }
  parameters() { return [ new IDParameter(),
                          new OrderParameter(this.orderAttributes) ]; }
  examples() { return [ new ItemExample() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "The item ID to display."; }
}
