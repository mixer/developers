import Example from "./example.js";

export default class AccessDeniedResult extends Example {
  httpCode() { return 403; }
  data() { return "Access denied."; }
}
