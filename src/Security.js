import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
  setAccessDeniedMessage, 
  getAccessDeniedMessage, 
  getDefaultUserPermissions,
  addDefaultUserPermission,
  removeDefaultUserPermission,
  getAccessForUsers,
  addAccessUser,
  removeAccessUser } from './configManager';

class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessMessage: getAccessDeniedMessage(),
      defaultRights: getDefaultUserPermissions(),
      pendingRight: '',
      users: getAccessForUsers(),
      pendingUser: ''
    };
  }

  render() {
    return (
      <div>
        <h3>Security</h3>
        <div className="input-option">
          <label className="lbl">Access Denied Message</label>
          <input type="text" className="in" value={this.state.accessMessage} onChange={this.accessChanged.bind(this)}/>
        </div>
        <div>
          <p>Default Rights</p>
          {this.state.defaultRights.map(right => {
            return <div><span>{right}</span><button onClick={this.removeRight(right).bind(this)}>Remove</button></div>
          })}
          <input type="text" value={this.state.pendingRight} onChange={this.updatePendingRight.bind(this)} />
          <button onClick={this.addPendingRight.bind(this)}>Add Default</button>
        </div>
        <div>
          <p>Users</p>
          {this.state.users.map(user => {
            return (
              <div key={user.name}>
                <span>{user.name}</span>
                <button onClick={this.removeUser(user)}>Remove</button>
                <Link to={`/security/${user.name}`}>Edit</Link>
              </div>
            );
          })}
          <input type="text" value={this.state.pendingUser} onChange={this.updatePendingUser.bind(this)} />
          <button onClick={this.addPendingUser.bind(this)}>Add User</button>
        </div>
      </div>
    );
  }

  accessChanged(event) {
    let message = event.target.value;

    setAccessDeniedMessage(message);
    this.setState({
      accessMessage: message
    });
  }

  updatePendingRight(event) {
    this.setState({
      pendingRight: event.target.value
    });
  }

  updatePendingUser(event) {
    this.setState({
      pendingUser: event.target.value
    });
  }

  addPendingRight() {
    addDefaultUserPermission(this.state.pendingRight);

    this.setState({
      pendingRight: '',
      defaultRights: getDefaultUserPermissions()
    });
  }

  addPendingUser() {
    addAccessUser({
      name: this.state.pendingUser,
      rights: []
    });

    this.setState({
      pendingUser: '',
      users: getAccessForUsers()
    });
  }

  removeRight(right) {
    return () => {
      removeDefaultUserPermission(right);

      this.setState({
        defaultRights: getDefaultUserPermissions()
      });
    }
  }

  removeUser(user) {
    return () => {
      removeAccessUser(user);

      this.setState({
        users: getAccessForUsers()
      });
    }
  }
}

export default Security;
