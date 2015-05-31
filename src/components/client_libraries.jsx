import React from "react";

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
          name: "python",
          url: "https://github.com/MCProHosting/beam-client-python"
        }, {
          name: "java",
          url: "htps://github.com/MCProHosting/beam-client-java"
        }, {
          name: "go",
          url: "https://github.com/MCProHosting/beam-client-go"
        }, {
          name: "node",
          url: "https://github.com/MCProHosting/beam-client-node",
        }
      ]
    }
  }

  render() {
    return (
      <div className="component client-libraries">
        <h2>Client Libraries</h2>
        <small>Develop for Beam on your platform of choice.</small>
        <ul>{
          this.state.clients.map(client => {
            return (
              <li>
                <ClientLibrary name={client.name}
                               url={client.url}
                               image={client.image}/>
              </li>
            );
          })
        }</ul>
      </div>
    );
  }
};
