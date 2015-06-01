import React from "react";
import Bootstrap from "react-bootstrap";

import ClientLibraries from "./client_libraries.js";

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Bootstrap.Col md={6}>
        <ClientLibraries/>
      </Bootstrap.Col>
    );
  }
}
