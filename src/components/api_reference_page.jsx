import React from "react/addons";
import {Row, Col} from "react-bootstrap";

import CategorySelector from "./api_category_selector.js";
import MethodGroup from "./method/method_group.js";
import DocumentationStore from "../api/store.js";

export default class APIReferencePage extends React.Component {
  static get contextTypes() { return { router: React.PropTypes.func } };

  constructor(props) {
    super(props);
  }

  render() {
    var name = this.context.router.getCurrentParams().name;
    let methods = DocumentationStore.findByGroup(name);

    return (
      <div className="test-page">
        <Col md={3}>
          <Row>
            <Col md={6}>
              <div data-spy="affix" data-offset-top="160">
                 <CategorySelector active={name}
                                   categories={DocumentationStore.categories()}/>
              </div>
            </Col>
            <Col md={6}></Col>
          </Row>
        </Col>
        <Col md={9}>
          <MethodGroup name={name} methods={methods}/>
        </Col>
      </div>
    );
  }
}
