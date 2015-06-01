import React from "react";
import Bootstrap from "react-bootstrap";

class ClientLibrary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="client-library">
        <img src={this.props.image} alt={this.props.name}/>
        <a href={this.props.url}>{this.props.name}</a>
      </div>
    );
  }
}

export default class ClientLibraries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [
        {
          name: "Python",
          url: "https://github.com/MCProHosting/beam-client-python",
          img: "/static/img/logo-python.svg"
        }, {
          name: "Java",
          url: "https://github.com/MCProHosting/beam-client-java",
          img: "/static/img/logo-java.svg"
        }, {
          name: "Golang",
          url: "https://github.com/MCProHosting/beam-client-go",
          img: "/static/img/logo-golang.svg"
        }, {
          name: "Node.js",
          url: "https://github.com/MCProHosting/beam-client-node",
          img: "/static/img/logo-nodejs.svg"
        }
      ]
    }
  }

  render() {
    return (
      <div className="component client-libraries">
        <div className="component-header">
          <h2>Client Libraries</h2>
          <span>Develop for Beam on your platform of choice.</span>
        </div>
        <Bootstrap.Row>{
          this.state.clients.map(client => {
            return (
              <Bootstrap.Col md={3}>
                <ClientLibrary name={client.name}
                               url={client.url}
                               image={client.img}/>
              </Bootstrap.Col>
            );
          })
        }</Bootstrap.Row>
     </div>
    );
  }
};
