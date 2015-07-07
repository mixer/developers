import Example from "./example.js";

export default class ResourceMissingResult extends Example {
  constructor(type) {
    super();
    this.type = type;
  }

  httpCode() { return 404; }
  data() { return `${this.type} not found.`; }
}
