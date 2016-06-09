import React from "react";
import {Col} from "react-bootstrap";

import fs from "fs";
import path from "path";

export default class WidgetPageComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  markup() {
    let contents = fs.readFileSync(path.join(__dirname, "../../_html/widgets.html"));
    return { __html: contents.toString() };
  }

  static token() {
    return "widgets";
  }

  render() {
    return (
      <Col md={12}>
        <div className="markup widget-markup" dangerouslySetInnerHTML={this.markup()}></div>
      </Col>
    );
  }
}
