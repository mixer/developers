import Parameter from "./parameter.js";

export default class OrderParameter extends Parameter {
  constructor(attributes) {
    this.attributes = attributes;
  }

  name() { return "order" }
  optional() { return true; }

  description() {
    return (
      <div>
        <p>
          Specifies the order in which items should be displayed in the format
          <code>attribute:order</code>. Order should be one of <code>asc</code>
          or <code>desc</code>. Attribute may be one of:
        </p>

        <ul>{
          return this.attributes.map((attribute) => { <li>${attribute}</li> })
        }</ul>

        <p>
          "If the attribute or order do not follow these rules, that sorting
          rule will be ignored."
        </p>
      </div>
    )
  }
}
