import React, { Component } from 'react';
import {
  setAccessDeniedMessage, 
  getAccessDeniedMessage, 
  getDefaultUserPermissions,
  addDefaultUserPermission,
  removeDefaultUserPermission } from './configManager';

class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessMessage: getAccessDeniedMessage(),
      defaultRights: getDefaultUserPermissions(),
      pendingRight: ''
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

  addPendingRight() {
    addDefaultUserPermission(this.state.pendingRight);

    this.setState({
      pendingRight: '',
      defaultRights: getDefaultUserPermissions()
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
}

export default Security;
