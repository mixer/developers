import React from "react";
import Bootstrap from "react-bootstrap";

export class List extends React.Component {
  render() {
    console.log(this.props.clients);
    return (
      <Bootstrap.Grid>
        <Bootstrap.Col xs={12} md={8}>
          <h2>
            Your OAuth Clients
            <a href="/oauth/edit" className="btn btn-alt btn-sm pull-right">Create New</a>
          </h2>
          <div className="oauth-clients">
            {this.props.clients.map((c, idx) => <Client {...c} key={idx} />)}
          </div>
        </Bootstrap.Col>
        <Bootstrap.Col xs={12} md={4}><Help /></Bootstrap.Col>
      </Bootstrap.Grid>
    );
  }
}

export class Edit extends React.Component {
  render() {
    const client = this.props.client || {};
    const edit = !!this.props.client;

    return (
      <Bootstrap.Grid>
        <Bootstrap.Col xs={12} md={8}>
          <h2>
            { edit ? 'Edit OAuth Client' : 'Create OAuth Client' }
          </h2>
          <form action="/oauth/edit" method="POST">
            { edit ? <input type="hidden" name="id" value={client.client_id} /> : '' }
            <Bootstrap.Input type='text' label='Name' placeholder='Client Name' value={client.name} />
            <Bootstrap.Input type='text' label='Website' placeholder='http://example.com' />
            <Bootstrap.Input
              type='text' label='Hosts'
              placeholder='Hosts' value={edit ? client.hosts.join(',') : ''}
              help='List of hosts, separated by commas. You will only be allowed to redirect to these hostnames.' />
            { edit ? '' : <Bootstrap.Input type='file' label='Logo' /> }
            <button className="btn btn-alt">Save</button>
          </form>
        </Bootstrap.Col>
        <Bootstrap.Col xs={12} md={4}><Help /></Bootstrap.Col>
      </Bootstrap.Grid>
    );
  }
}

class Help extends React.Component {
  render() {
    return (
      <div>
        <h2>Get Started with OAuth</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum metus eu lacus laoreet elementum. Morbi vehicula luctus tortor, eget gravida felis condimentum non. Morbi lobortis rhoncus tellus in ultrices. Duis id neque vitae diam elementum commodo et eget risus. Mauris vitae scelerisque urna. Ut in porttitor neque. Nunc euismod augue id velit molestie tristique. Curabitur rhoncus vestibulum quam.</p>
        <p>Nullam eget suscipit mi. Vivamus feugiat metus nec leo dapibus pharetra. Donec finibus, lacus non posuere posuere, ligula leo posuere lorem, at malesuada mi mi in odio. Duis aliquam diam et dolor finibus pharetra auctor in ligula. Mauris faucibus justo nulla, a tincidunt nibh mattis ac.</p>
        <p><a href="/doc/oauth">Read More...</a></p>
      </div>
    );
  }
}


class Client extends React.Component {
  getSecretItem () {
    const secret = this.props.client_secret
    if (!secret) {
      return;
    }

    return (
      <tr>
        <th>Client Secret</th>
        <td className="blurred"><Selector value={this.props.client_secret} /></td>
      </tr>
    );
  }

  render() {
    return (
      <div className="oauth-client">
        <div className="logo">
          <img src={this.props.logo} alt={this.props.name} />
        </div>
        <div className="content">
          <a href={'/oauth/edit/' + this.props.client_id} className="edit">Edit</a>
          <h3>{this.props.name}</h3>
          <table>
            <tr><th>Client ID</th><td><Selector value={this.props.client_id} /></td></tr>
            {this.getSecretItem()}
            <tr><th>Allowed Hosts</th><td>{this.props.hosts.join(', ')}</td></tr>
            <tr><th>Website</th><td><a href={this.props.website}>{this.props.website}</a></td></tr>
          </table>
        </div>
      </div>
    );
  }
}

class Selector extends React.Component {
  render() {
    return (
      <input readOnly
        value={this.props.value}
        className="hover-select form-control input-sm" />
    );
  }
}
