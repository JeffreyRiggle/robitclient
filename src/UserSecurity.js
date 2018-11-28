import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getAccessForUsers} from './configManager';

class UserSecurity extends Component {
    constructor(props) {
        super(props);

        this.user = this.getUser(this.props.match.params.id);

        if (!this.user) {
            this.state = { found: false };
            return;
        }

        this.state = {
            name: this.user.name,
            rights: this.user.rights,
            pendingRight: '',
            found: true
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

    render() {
        if (!this.state.found) {
            return (
                <div>
                    <h4><Link to="/security">Back</Link></h4>
                    <h3>Something is wrong user was not found :(</h3>
                </div>
            );
        }

        return (
            <div>
                <h4><Link to="/security">Back</Link></h4>
                <h3>{this.state.name} Security</h3>
                <div>
                  <p>User Rights</p>
                  {this.state.rights.map(right => {
                    return <div><span>{right}</span><button onClick={this.removeRight(right).bind(this)}>Remove</button></div>
                  })}
                  <input type="text" value={this.state.pendingRight} onChange={this.updatePendingRight.bind(this)} />
                  <button onClick={this.addPendingRight.bind(this)}>Add Right</button>
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
            rights: this.user.rights
        });
    }

    removeRight(right) {
        return () => {
            let ind = this.user.rights.indexOf(right);

            if (ind !== -1) {
                this.user.rights.splice(ind, 1);
            }

            this.setState({
                rights: this.user.rights
            });
        }
    }
}

export default UserSecurity;