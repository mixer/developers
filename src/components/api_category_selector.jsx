import React from "react";

export default class APICategorySelector extends React.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <div className="api-category-selector">
        <ul>{
          this.props.categories.map((category) => {
            let categoryUrl = `/api/v1/${category}`;
            let className = category === this.props.active ? "category-active"
                                                           : "";
            return (
              <li className={className}>
                <a href={categoryUrl}>{category}</a>
              </li>
            )
          })
        }</ul>
      </div>
    )
  }
}
