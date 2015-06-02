import React from "react";

export default class Header extends React.Component {
  constructor(params) {
    super(params);
    this.state = { routes: [
      { text: 'Home', slug: 'home', path: '/' },
      { text: 'Examples', slug: 'examples', path: '/examples' },
      { text: 'API Reference', slug: 'api-reference', path: '/api/reference' },
      { text: 'Open Source', slug: 'open-source', path: '/open-source' }
    ]}
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
        <div className="header-nav pull-right">
          <ul>{
            this.state.routes.map(route => {
              return (
                <li data-active={this.props.currentRoute == route.slug}>
                  <a href={route.path}>{route.text}</a>
                </li>
              );
            })
          }</ul>
        </div>
      </header>
    );
  }
};
