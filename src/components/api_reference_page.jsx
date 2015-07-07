import React from "react/addons";
import {Nav, NavItem, Row, Col} from "react-bootstrap";

import MethodSelector from "./api_method_selector.js";
import CategorySelector from "./api_category_selector.js";
import MethodGroup from "./method/method_group.js";
import DocumentationStore from "../api/store.js";

export default class APIReferencePage extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(props) {
    super(props);
  }

  render() {
    let defaultName = "achievements";

    let target = this.context.router.getCurrentParams().name;
    let name = DocumentationStore.hasDocumentsFor(target) ? target : defaultName;
    let methods = DocumentationStore.findByGroup(name);

    return (
      <div className="api-method-page">
        <Col md={3}>
          <Row>
            <Col md={5}>
              <div data-spy="affix" data-offset-top="160">
                 <CategorySelector active={name}
                                   categories={DocumentationStore.categories()}/>
              </div>
            </Col>
            <Col md={7}>
              <div data-spy="affix" data-offset-top="160">
                <MethodSelector methods={methods} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={9}>
          <MethodGroup name={name} methods={methods}/>
        </Col>
      </div>
    );
  }
}
