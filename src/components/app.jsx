import React from "react";
import Router from "react-router";
import Bootstrap from "react-bootstrap";

import Header from "./header.js";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="application">
        <Bootstrap.Grid>
          <Bootstrap.Row>
            <Bootstrap.Col md={12}>
              <Header/>
            </Bootstrap.Col>
          </Bootstrap.Row>
          <Bootstrap.Row>
            <Router.RouteHandler />
          </Bootstrap.Row>
        </Bootstrap.Grid>
      </div>
    );
  }
}
