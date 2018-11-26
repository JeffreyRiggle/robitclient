import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MultiAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: this.props.action.action.actions,
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
            <button onClick={this.addAction.bind(this)}>Add Action</button>
        </div>
        {this.state.actions.map(action => {
          return (
            <div key={action.id}>
              <span>{action.id}</span>
              <button onClick={this.removeAction(action)}>Remove</button>
              <Link to={{ pathname: `/actions/${this.props.action.id}/${action.id}`}}>Edit</Link>
            </div>
          );
        })}
      </div>
    );
  }

  actionIdChanged(event) {
    this.setState({
        newActionId: event.target.value
    });
  }

  addAction() {
    this.props.action.action.actions.push({
      id: this.state.newActionId
    });

    this.setState({
        newActionId: '',
        actions: this.props.action.action.actions
    });
  }

  removeAction(action) {
    return () => {
        let ind = this.props.action.action.actions.indexOf(action);

        if (ind !== -1) {
            this.props.action.action.actions.splice(ind, 1);
        }

        this.setState({
            actions: this.props.action.action.actions
        });
    }
  }
}

export default MultiAction;
