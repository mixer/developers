import React from "react";
import {Row, Col} from "react-bootstrap";

export default class ParameterComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <Row className="api-parameter">
        <Col md={2} className="parameter-name">
          <span>:{this.props.parameter.name()}</span>
        </Col>
        <Col md={10} className="parameter-description">
          {this.props.parameter.description()}
        </Col>
      </Row>
    );
  };
};
