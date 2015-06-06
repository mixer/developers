import Example from "./example.js";

export default class ErrorfulRepsonse extends Example {
  httpCode() { return 400; }
  data() { return "Standard invalid response."; }
}
