import React from "react";

export default class Header extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <header>
        <div className="header-text pull-left">
          <h1>Beam</h1>
          <h2>
            Developer Documentation<br/>
            &amp; Resources
          </h2>
        </div>
      </header>
    );
  }
};
