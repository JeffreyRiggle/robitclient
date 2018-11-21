import React, { Component } from 'react';

class BroadcastAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.action.message,
      help: this.props.action.help,
      channelId: this.props.action.channel
    };
  }

  render() {
    return (
      <div>
        <div>
          <label>Message</label>
          <input type="text" value={this.state.message} onChange={this.updateMessage.bind(this)}/>
        </div>
        <div>
          <label>Help Message</label>
          <input type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
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

    this.props.action.message = message;

    this.setState({
      message: message
    });
  }

  updateHelp(event) {
    let help = event.target.value;

    this.props.action.help = help;

    this.setState({
      help: help
    });
  }

  updateChannel(event) {
    let channel = event.target.value;

    this.props.action.channel = channel;

    this.setState({
        channelId: channel
    });
  }
}

export default BroadcastAction;
