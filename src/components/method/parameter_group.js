import React from "react";
import Parameter from "./parameter";

export default class ParameterGroup extends React.Component {
  constructor(params) {
    super(params);
  }

  parameters() {
    return this.props.parameters.map((parameter) => <Parameter parameter={parameter}/> );
  }

  render() {
    return (
      <div className="parameters">
        <span className="parameters-header">Parameters</span>
        <ul className="parameters-list">{
          this.parameters().map((parameter) => <li>{ parameter }</li>)
        }</ul>
      </div>
    );
  }
}
