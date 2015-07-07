import React from "react";
import { Nav, NavItem } from "react-bootstrap";

export default class MethodSelectorComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <div className="api-method-selector">
        <Nav bsStyle="pills" stacked>{
          this.props.methods.map((method) => {
            let uri = method.uri().substring("/api/v1".length);
            let href = `#${method.httpMethod().toLowerCase()}:${method.uri().replace(/:|\//g, "")}`;

            return <NavItem href={href}>{uri}</NavItem>;
          })
        }</Nav>
      </div>
    );
  }
}
