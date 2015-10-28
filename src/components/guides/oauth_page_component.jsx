import React from "react";
import {Col} from "react-bootstrap";

import fs from "fs";
import path from "path";

export default class WidgetPageComponent extends React.Component {
  constructor(params) {
    super(params);
  }

  markup() {
    let contents = fs.readFileSync(path.join(__dirname, "../../_html/oauth.html"));
    return { __html: contents.toString() };
  }

  static token() {
    return "oauth";
  }

  render() {
    return (
      <Col md="12">
        <div className="markup chat-markup" dangerouslySetInnerHTML={this.markup()}></div>
      </Col>
    );
  }
}
