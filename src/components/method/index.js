import React from "react";
import {Row, Col} from "react-bootstrap";

import Example from "./example.js";
import Parameter from "./parameter.js";

export default class MethodComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  parameters() {
    return this.props.endpoint.parameters().map((parameter) => {
      return <Parameter parameter={parameter} />
    });
  }

  examples() {
    return this.props.endpoint.examples().map((example) => {
      return <Example example={example} />
    });
  }

  render() {
    return (
      <div className="api-method-container">
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
            <Col md={6}>
              <div className="parameters">
                <span className="parameters-header">Parameters</span>
                <ul className="parameters-list">{
                  this.parameters().map((parameter) => <li>{parameter}</li> )
                }</ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="examples">
                <ul className="examples-list">{
                  this.examples().map((example) => <li>{example}</li> )
                }</ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};
