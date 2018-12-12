import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getActions, addAction, removeAction} from './configManager';

class Actions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: getActions(),
      newActionId: ''
    };
  }

  render() {
    return (
      <div>
        <h3>Actions</h3>
        <div>
            <label>New Action</label>
            <input type="text" value={this.state.newActionId} onChange={this.actionIdChanged.bind(this)}/>
            <button onClick={this.addAction.bind(this)} disabled={!this.state.newActionId}>Add Action</button>
        </div>
        <div className="item-list">
          {this.state.actions.map(action => {
            return (
              <div key={action.id} className="item">
                <span className="txt">{action.id}</span>
                <Link className="button edit" to={`/actions/${action.id}`}>Edit</Link>
                <button onClick={this.removeAction(action)}>Remove</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  actionIdChanged(event) {
    this.setState({
        newActionId: event.target.value
    });
  }

  addAction() {
    addAction({
        id: this.state.newActionId
    });

    this.setState({
        newActionId: '',
        actions: getActions()
    });
  }

  removeAction(action) {
    return () => {
        removeAction(action);

        this.setState({
            actions: getActions()
        });
    }
  }
}

export default Actions;
