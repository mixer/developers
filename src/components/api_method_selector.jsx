import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import methodSort from "../lib/methodSort";


export default class MethodSelectorComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <div className="api-method-selector">
        <Nav bsStyle="pills" stacked>{
          this.props.methods
              .sort(methodSort)
              .map((method) => {
            let meth = method.httpMethod().toUpperCase();
            let uri = method.uri().substring("/api/v1".length);
            let href = `#${method.httpMethod().toLowerCase()}:${method.uri().replace(/:|\//g, "")}`;

            return <NavItem href={href}><code>{meth}</code> {uri}</NavItem>;
          })
        }</Nav>
      </div>
    );
  }
}
