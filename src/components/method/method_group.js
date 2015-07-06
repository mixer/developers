import React from "react";
import Method from "./index.js";

export default class MethodGroup extends React.Component {
  constructor(params) {
    super(params);
  }

  methods() {
    return this.props.methods.map((method) => <Method endpoint={method}/>);
  }

  render() {
    return (
      <div className="method-group" id={this.props.name}>
        <ul className="methods">{
          this.methods().map((m) => <li>{ m }</li>)
        }</ul>
      </div>
    )
  }
}
