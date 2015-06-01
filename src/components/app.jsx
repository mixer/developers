import React from "react";
import Router from "react-router";
import Bootstrap from "react-bootstrap";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Bootstrap.Grid>
        <Bootstrap.Row>
          <Router.RouteHandler />
        </Bootstrap.Row>
      </Bootstrap.Grid>
    );
  }
}
