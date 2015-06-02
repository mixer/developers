import React from "react";
import Bootstrap from "react-bootstrap";

import GettingStarted from "./getting_started.js";
import ClientLibraries from "./client_libraries.js";

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-page">
        <Bootstrap.Col md={7}>
          <GettingStarted/>
        </Bootstrap.Col>
        <Bootstrap.Col md={5}>
          <ClientLibraries/>
        </Bootstrap.Col>
      </div>
    );
  }
}
