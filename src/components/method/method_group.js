import React from "react";
import Method from "./index.js";
import methodSort from "../../lib/methodSort";

export default class MethodGroup extends React.Component {
  constructor(params) {
    super(params);
  }

  methods() {
    return this.props.methods.sort(methodSort).map((method) => <Method endpoint={method}/>);
  }

  render() {
    return (
      <div className="method-group" id={this.props.name}>
        <ul className="methods">{
          this.methods().map((m) => {
            let href = `#${m.props.endpoint.httpMethod().toLowerCase()}:${m.props.endpoint.uri().replace(/:|\//g, "")}`;

            return <li key={href}>{ m }</li>;
          })
        }</ul>
      </div>
    )
  }
}
