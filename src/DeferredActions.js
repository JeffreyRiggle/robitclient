import React, { Component } from 'react';
import {getDeferredActions, addDeferredAction, removeDeferredAction} from './configManager';
import DeferredAction from './DeferredAction';

class DeferredActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: getDeferredActions()
    }
  }

  render() {
    return (
      <div>
        <h3>Deferred Actions</h3>
        {this.state.actions.map(action => {
          return <div><DeferredAction action={action}/><button onClick={this.removeDeferred(action)}>Remove</button></div>
        })}
        <button onClick={this.addDeferred.bind(this)}>Add Deferred</button>
      </div>
    );
  }

  addDeferred() {
    addDeferredAction({
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
