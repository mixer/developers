import React from "react";

export default class Changelog extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <div className="changelog component">
        <div className="component-header">
          <h2>Changelog</h2>
          <span>Read up on what's been going on.</span>
        </div>
      </div>
    )
  }
}
