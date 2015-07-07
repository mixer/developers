import React from "react";
import {Row, Col} from "react-bootstrap";

import ParameterGroup from "./parameter_group.js";
import ExampleGroup from "./example_group.js";

export default class MethodComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    let uri = this.props.endpoint.uri();
    let parameters = this.props.endpoint.parameters();
    let examples = this.props.endpoint.examples();
    let id = this.props.endpoint.httpMethod().toLowerCase()+":"+uri.replace(/\/|:/g, "");

    return (
      <div className="api-method" id={id}>
        <span className="api-method-heading">
          <span className="http-method">{ this.props.endpoint.httpMethod() }</span>
          <span className="uri">{ this.props.endpoint.uri() }</span>
        </span>

        <div className="api-method-body">
          <Row>
            <Col md={12}>
              <div className="api-method-description">{ this.props.endpoint.description() }</div>
            </Col>
          </Row>
          <Row>
            <Col md={5}><ParameterGroup parameters={ parameters }/></Col>
            <Col md={7}><ExampleGroup examples={ examples }/></Col>
          </Row>
        </div>
      </div>
    );
  }
};
