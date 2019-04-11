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
  removeAccessUser, 
  getActions,
  knownActions } from './configManager';
import Help from './Help/Help';
import getHelp from './Help/helpProvider';
import './Security.scss';

const deniedHelp = getHelp('deniedMessage');

class Security extends Component {
  constructor(props) {
    super(props);

    let actions = this.getActionNames();
    const userPermissions = getDefaultUserPermissions();

    this.state = {
      accessMessage: getAccessDeniedMessage(),
      defaultRights: userPermissions,
      pendingRight: actions[0].value,
      users: getAccessForUsers(),
      pendingUser: '',
      actions: actions,
      rightsDisabled: userPermissions.indexOf('*') !== -1
    };
  }

  getActionNames() {
    let actions = knownActions;

    getActions().forEach(action => {
      actions.push({
        displayName: action.id,
        value: action.id
      });
    });

    return actions;
  }

  render() {
    return (
      <div className="content-view">
        <h3>Security</h3>
        <div className="input-option">
          <label className="lbl">Access Denied Message</label>
          <input type="text" className="in" value={this.state.accessMessage} onChange={this.accessChanged.bind(this)}/>
          <Help message={deniedHelp} />
        </div>
        <div>
          <p>Default Rights</p>
          <div className="input-option">
            <select className="in" onChange={this.updatePendingRight.bind(this)} disabled={this.state.rightsDisabled}>
              {this.state.actions.map(action => {
                return <option value={action.value} key={action.value}>{action.displayName}</option>
              })}
            </select>
            <button onClick={this.addPendingRight.bind(this)}>Add Default</button>
          </div>
          <div className="item-list">
            {this.state.defaultRights.map(right => {
              return <div className="item"><span className="txt">{right}</span><button onClick={this.removeRight(right).bind(this)}>Remove</button></div>
            })}
          </div>
        </div>
        <div>
          <p>Users</p>
          <div className="input-option">
            <input className="in" type="text" value={this.state.pendingUser} onChange={this.updatePendingUser.bind(this)} />
            <button onClick={this.addPendingUser.bind(this)}>Add User</button>
          </div>
          <div className="item-list">
            {this.state.users.map(user => {
              return (
                <div key={user.name} className="item">
                  <span className="txt">{user.name}</span>
                  <Link className="button edit" to={`/security/${user.name}`}>Edit</Link>
                  <button onClick={this.removeUser(user)}>Remove</button>
                </div>
              );
            })}
          </div>
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

    const userPermissions = getDefaultUserPermissions();

    this.setState({
      pendingRight: '',
      defaultRights: userPermissions,
      rightsDisabled: userPermissions.indexOf('*') !== -1
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

      const userPermissions = getDefaultUserPermissions();

      this.setState({
        defaultRights: userPermissions,
        rightsDisabled: userPermissions.indexOf('*') !== -1
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
