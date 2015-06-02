import React from "react";

export default class OpenSource extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <div className="open-source component">
        <div className="component-header">
          <h2>Open Source</h2>
          <span>Come take a look at our freely available software, on GitHub!</span>
        </div>
      </div>
    );
  }
}
