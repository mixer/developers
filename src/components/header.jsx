import React from "react";
import Bootstrap from "react-bootstrap";

export default class Header extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(params) {
    super(params);
  }

  active (regexp) {
    let match = regexp.exec(this.context.router.getCurrentPath());

    return match !== null;
  }

  getManageBtn () {
    if (this.props.authed) {
      return (
        <li data-active={this.active(/^\/oauth\/manage/)}>
          <a href="/oauth/manage">Manage OAuth</a>
        </li>
      );
    } else {
      return <li><a href="/login/redirect">Login</a></li>
    }
  }

  render() {
    return (
      <header className="clearfix">
        <Bootstrap.Grid fluid={true}>
          <div className="header-text pull-left">
            <h1>Beam</h1>
            <h2>
              Developer Documentation<br/>
              &amp; Resources
            </h2>
          </div>

          <div className="header-version">
            Latest: 1.2
          </div>

          <div className="header-nav pull-right"><ul>
            <li data-active={this.active(/^\/$/)}><a href="/">Home</a></li>
            <li data-active={this.active(/^\/api\/guides\//)}><a href="/api/guides/">Dev Guides</a></li>
            <li data-active={this.active(/^\/api\/v1\//)}><a href="/api/v1/">API Reference</a></li>
            {this.getManageBtn()}
          </ul></div>

        </Bootstrap.Grid>

      </header>
    );
  }
};
