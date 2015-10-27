import React from "react/addons";
import {Nav, NavItem, Row, Col} from "react-bootstrap";

import MethodSelector from "./api_method_selector.js";
import CategorySelector from "./api_category_selector.js";
import MethodGroup from "./method/method_group.js";
import DocumentationStore from "../api/store.js";
import Bootstrap from "react-bootstrap";

export default class APIReferencePage extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(props) {
    super(props);
  }

  render() {

    let target = this.context.router.getCurrentParams().name;
    let name = DocumentationStore.hasDocumentsFor(target) ? target : defaultName;
    let methods = DocumentationStore.findByGroup(name);

    return (
      <div className="api-method-page">
        <Bootstrap.Grid fluid="true">
          <Bootstrap.Row>
            <Col lg={4} md={5} sm={6}>
              <Row>
                <Col md={5}>
                  <div className="a-left" data-spy="affix" data-offset-top="160">
                     <CategorySelector active={name}
                                       base="/api/v1"
                                       categories={DocumentationStore.categories()}/>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="a-right" data-spy="affix" data-offset-top="160">
                    <MethodSelector methods={methods} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={7} sm={6}>
              <MethodGroup name={name} methods={methods}/>
            </Col>
          </Bootstrap.Row>
        </Bootstrap.Grid>
      </div>
    );
  }
}
