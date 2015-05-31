import React from "react";

import ClientLibraries from "./client_libraries.js";

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ClientLibraries/>
    );
  }
}
