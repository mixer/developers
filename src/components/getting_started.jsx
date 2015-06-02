import React from "react";

export default class GettingStarted extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <div className="component getting-started">
        <div className="component-header">
          <h2>Getting Started</h2>
        </div>
        <ol>
          <li>Read our <a href="#">getting started</a> guide</li>
          <li>Join our <a href="#">Gitter development channel</a></li>
          <li>Start developing using our API documentation</li>
        </ol>
      </div>
    );
  }
}
