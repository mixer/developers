import React from "react";
import Bootstrap from "react-bootstrap";

import Method from "./method/index.js";

export default class TestPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let endpoint = require("../api/docs/resource/findAll.js");
    return (
      <div className="test-page">
        <Bootstrap.Col md={2}></Bootstrap.Col>
        <Bootstrap.Col md={10}>
          <Method endpoint={new endpoint()}/>
        </Bootstrap.Col>
      </div>
    );
  }
}
