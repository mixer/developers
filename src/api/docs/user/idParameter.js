import Parameter from "../../parameter.js";

export default class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of the user."; }
}
