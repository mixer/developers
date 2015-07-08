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
        <Header/>
        <img src="/static/img/line.svg" className="line" />
        <Router.RouteHandler />
      </div>
    );
  }
}
