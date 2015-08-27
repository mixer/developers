import React from "react";
import Bootstrap from "react-bootstrap";

export default class ValidatedInput extends React.Component {
  render() {
    const props = this.props;
    const invalid = props.invalid && props.invalid[props.name];

    if (invalid) {
      props.bsStyle = 'error';
      props.help = Array.isArray(invalid) ? invalid.join('. ') : invalid;
    }

    return (
      <Bootstrap.Input {...props} />
    );
  }
}
