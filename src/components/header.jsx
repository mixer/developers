import React from "react";

export default class Header extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(params) {
    super(params);
  }

  active (regexp) {
    let match = regexp.exec(this.context.router.getCurrentPath());

    return match !== null;
  }

  render() {
    return (
      <header className="clearfix">

        <div className="header-text pull-left">
          <h1>Beam</h1>
          <h2>
            Developer Documentation<br/>
            &amp; Resources
          </h2>
        </div>

        <div className="header-nav pull-right"><ul>
          <li data-active={this.active(/^\/$/)}><a href="/">Home</a></li>
          <li data-active={this.active(/^\/api\/v1\//)}><a href="/api/v1/">API Reference</a></li>
        </ul></div>

      </header>
    );
  }
};
