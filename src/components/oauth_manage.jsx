import React from "react";
import Bootstrap from "react-bootstrap";
import ValidatedInput from "./validated_input";

export class List extends React.Component {
  render() {
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
    const invalid = this.props.invalid;
    const edit = !!this.props.client;

    return (
      <Bootstrap.Grid>
        <Bootstrap.Col xs={12} md={8}>
          <h2>
            { edit ? 'Edit OAuth Client' : 'Create OAuth Client' }
          </h2>
          { invalid ? <Bootstrap.Alert bsStyle='danger'>
                  There was an error with your registration.
                </Bootstrap.Alert> : '' }
          <form action="/oauth/edit" method="POST" encType={ edit ? undefined : "multipart/form-data" }>
            { edit ? <input type="hidden" name="id" value={client.client_id} /> : '' }
            <ValidatedInput invalid={invalid} name='name' type='text' label='Name'
              placeholder='Client Name' value={client.name} />
            <ValidatedInput invalid={invalid} name='website' type='text' label='Website' placeholder='http://example.com' value={client.website} />
            <ValidatedInput invalid={invalid} name='hosts'
              type='text' label='Hosts'
              placeholder='Hosts' value={edit ? client.hosts.join(', ') : ''}
              help='List of hosts, separated by commas. You will only be allowed to redirect to these hostnames.' />
            { edit ? '' : (
              <div>
                <ValidatedInput invalid={invalid} name='logo' type='file' label='Logo' />
                <ValidatedInput type='checkbox' name='secret' label='Confidential' help={
                  'If checked, your client will be issued and must use a secret key. ' +
                  'This should only be checked if you client can keep the key a secret. ' +
                  'For example, mobile apps cannot maintain confidentiality, ' +
                  'but backend web services can.'
                } />
              </div>
            )}
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
        <p>OAuth allows apps to request authorization from users to private account functions without requiring the user to provide their actual password.</p>
        <p>Want to implement an OAuth app? We make it easy.</p>
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
            <tr><th>Website</th><td><a href={this.props.website} target="_blank">{this.props.website}</a></td></tr>
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
