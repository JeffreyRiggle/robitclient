import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getAccessForUsers, knownActions} from './configManager';

class UserSecurity extends Component {
    constructor(props) {
        super(props);

        this.user = this.getUser(this.props.match.params.id);

        if (!this.user) {
            this.state = { found: false };
            return;
        }

        let actions = this.getActionNames();

        this.state = {
            name: this.user.name,
            rights: this.user.rights,
            pendingRight: actions[0].value,
            found: true,
            actions: actions,
            rightsDisabled: this.user.rights.indexOf('*') !== -1
        };
    }

    getUser(userId) {
        let retVal;
        getAccessForUsers().forEach(user => {
            if (!retVal && (user.name === userId)) {
                retVal = user;
            }
        });

        return retVal;
    }

    getActionNames() {
      let actions = knownActions;

      this.user.rights.forEach(action => {
        actions.push({
          displayName: action.id,
          value: action.id
        });
      });

      return actions;
    }

    render() {
        if (!this.state.found) {
            return (
                <div>
                    <h4><Link className="button" to="/security">Back</Link></h4>
                    <h3>Something is wrong user was not found :(</h3>
                </div>
            );
        }

        return (
            <div>
                <h4><Link className="button" to="/security">Back</Link></h4>
                <h3>{this.state.name} Security</h3>
                <div>
                  <p>User Rights</p>
                  <div className="input-option">
                      <select className="in" onChange={this.updatePendingRight.bind(this)} disabled={this.state.rightsDisabled}>
                          {this.state.actions.map(action => {
                              return <option value={action.value} key={action.value}>{action.displayName}</option>
                          })}
                      </select>
                      <button onClick={this.addPendingRight.bind(this)}>Add Right</button>
                  </div>
                  <div className="item-list">
                      {this.state.rights.map(right => {
                        return <div className="item"><span className="txt">{right}</span><button onClick={this.removeRight(right).bind(this)}>Remove</button></div>
                      })}
                  </div>
                </div>
            </div>
        );
    }

    updatePendingRight(event) {
        this.setState({
            pendingRight: event.target.value
        });
    }

    addPendingRight() {
        this.user.rights.push(this.state.pendingRight);

        this.setState({
            pendingRight: '',
            rights: this.user.rights,
            rightsDisabled: this.user.rights.indexOf('*') !== -1
        });
    }

    removeRight(right) {
        return () => {
            let ind = this.user.rights.indexOf(right);

            if (ind !== -1) {
                this.user.rights.splice(ind, 1);
            }

            this.setState({
                rights: this.user.rights,
                rightsDisabled: this.user.rights.indexOf('*') !== -1
            });
        }
    }
}

export default UserSecurity;