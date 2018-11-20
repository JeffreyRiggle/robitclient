import React, { Component } from 'react';
import {getActionById} from './configManager';

class Action extends Component {
  constructor(props) {
    super(props);

    let action;
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
        action = getActionById(this.props.match.params.id);
    }

    this.action = action;

    this.state = {
      selectedType: (action && action.type) || 'Broadcast',
      id: action && action.id,
      message: action && action.message,
      channelId: action && action.channel
    };
  }

  render() {
    if (!this.action) {
        return (
            <div>
                <h3>Something went wrong action {this.state.id || 'unknown'} was not found :(</h3>
            </div>
        )
    }

    return (
      <div>
        <h3>Action {this.state.action && this.state.action.id}</h3>
        <div>
          <label>Type</label>
          <select value={this.state.selectedType} onChange={this.typeChanged.bind(this)}>
            <option name="broadcast">Broadcast</option>
            <option name="randombroadcast">Random Broadcast</option>
            <option name="embed">Embed</option>
            <option name="http">Http</option>
            <option name="multiaction">Multi-Action</option>
          </select>
          {this.renderTypedAction()}
        </div>
      </div>
    );
  }

  renderTypedAction() {
      if (this.state.selectedType === 'Broadcast') {
          return this.renderBroadCast();
      }

      return <div>Something went wrong, cant render type {this.state.selectedType}</div>
  }

  renderBroadCast() {
      return (
        <div>
          <div>
            <label>Message</label>
            <input type="text" value={this.state.message} onChange={this.updateMessage.bind(this)}/>
          </div>
          <div>
            <label>Channel Id or Name (optional)</label>
            <input type="text" value={this.state.channelId} onChange={this.updateChannel.bind(this)}/>
          </div>
        </div>
      );
  }

  updateMessage(event) {
      let message = event.target.value;

      this.action.message = message;

      this.setState({
          message: message
      });
  }

  updateChannel(event) {
    let channel = event.target.value;

    this.action.channel = channel;

    this.setState({
        channelId: channel
    });
  }

  typeChanged(event) {
      let newType = event.target.value;

      this.action.type = newType;
      this.setState({
          selectedType: newType
      });
  }
}

export default Action;
