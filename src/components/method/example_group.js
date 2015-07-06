import React from "react";
import Example from "./example";

export default class ExampleGroup extends React.Component {
  constructor(params) {
    super(params);
  }

  examples() {
    return this.props.examples.map((example) => <Example example={example}/> );
  }

  render() {
    return (
      <div className="examples">
        <ul className="examples-list">{
          this.examples().map((ex) => <li>{ ex }</li>)
        }</ul>
      </div>
    );
  }
}
