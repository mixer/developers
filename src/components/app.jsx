import React from "react";
import Router from "react-router";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="application">
        <Router.RouteHandler />
      </div>
    );
  }
}
