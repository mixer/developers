import React from "react/addons";
import {Nav, NavItem, Row, Col} from "react-bootstrap";

import MethodSelector from "./api_method_selector.js";
import CategorySelector from "./api_category_selector.js";
import Bootstrap from "react-bootstrap";

import ChatProtoPageComponent from "./chatproto_page_component.js";
import WidgetPageComponent from "./widget_page_component.js";

export default class APIReferencePage extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(props) {
    super(props);
  }

  render() {
    let name = (this.context.router.getCurrentParams().name || "chat").toLowerCase();

    let guideComp = undefined;
    if (name === "chat") {
      guideComp = <ChatProtoPageComponent />
    } else if (name === "widgets") {
      guideComp = <WidgetPageComponent />
    }

    return (
      <div className="api-method-page">
        <Bootstrap.Grid fluid="true">
          <Bootstrap.Row>
            <Col md={3}>
              <div className="a-left" data-spy="affix" data-offset-top="160">
                 <CategorySelector active={name}
                                   base="/api/guides"
                                   categories={[ "chat", "widgets" ]}/>
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
