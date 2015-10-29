import React from "react/addons";
import Glob from "glob";
import Path from "path";
import {Nav, NavItem, Row, Col} from "react-bootstrap";

import MethodSelector from "./api_method_selector.js";
import CategorySelector from "./api_category_selector.js";
import Bootstrap from "react-bootstrap";

let documents = {};
Glob.sync(Path.join(__dirname, "guides", '**/*.js'))
    .forEach((path) => {
      let Component = require(path);

      documents[Component.token()] = Component;
    });


export default class APIReferencePage extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(props) {
    super(props);
  }

  render() {
    let name = (this.context.router.getCurrentParams().name || "chat").toLowerCase();
    let Component = documents[name];

    let guideComp = <Component />;

    return (
      <div className="api-method-page">
        <Bootstrap.Grid fluid={true}>
          <Bootstrap.Row>
            <Col md={3}>
              <div className="a-left" data-spy="affix" data-offset-top="160">
                 <CategorySelector active={name}
                                   base="/api/guides"
                                   categories={Object.keys(documents)}/>
              </div>
            </Col>
            <Col md={9}>
              { guideComp }
            </Col>
          </Bootstrap.Row>
        </Bootstrap.Grid>
      </div>
    );
  }
}
