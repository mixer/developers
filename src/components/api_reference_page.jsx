import React from "react/addons";
import Bootstrap from "react-bootstrap";

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
        <Bootstrap.Col md={2}></Bootstrap.Col>
        <Bootstrap.Col md={10}>
          <MethodGroup name={name} methods={methods}/>
        </Bootstrap.Col>
      </div>
    );
  }
}
