import AcceptCostreamRequestMehtod from "./accept.js";

export default class DeclineCostreamRequest extends AcceptCostreamRequestMethod {
  uri() { return "/api/v1/costreams/:id/decline"; }
  description() { return "Causes a costream request to be denied."; }
}
