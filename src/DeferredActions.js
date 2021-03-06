import React, { Component } from 'react';
import {getDeferredActions, addDeferredAction, removeDeferredAction} from './configManager';
import DeferredAction from './DeferredAction';
import './DeferredActions.scss';

class DeferredActions extends Component {
  constructor(props) {
    super(props);

    this.iter = 0;
    this.state = {
      actions: getDeferredActions()
    }

    this.state.actions.forEach((action) => {
      this.iter = Math.max(this.iter, action.id);
    });
  }

  render() {
    return (
      <div className="content-view">
        <h3>Deferred Actions <button className="add-deferred" onClick={this.addDeferred.bind(this)}>Add Deferred</button></h3>
        {this.state.actions.map(action => {
          return <div key={action.id}><DeferredAction action={action}/><button onClick={this.removeDeferred(action)}>Remove</button></div>
        })}
      </div>
    );
  }

  addDeferred() {
    addDeferredAction({
      id: (++this.iter).toString(),
      action: {}
    });

    this.setState({
      actions: getDeferredActions()
    });
  }

  removeDeferred(action) {
    return () => {
      removeDeferredAction(action);

      this.setState({
        actions: getDeferredActions()
      });
    }
  }
}

export default DeferredActions;
