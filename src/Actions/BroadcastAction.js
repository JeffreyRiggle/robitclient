import React, { Component } from 'react';
import Help from '../Help/Help';
import getHelp from '../Help/helpProvider';

const messageHelp = getHelp('broadcastMessage');
const helpMessageHelp = getHelp('helpMessage');
const channelInfoHelp = getHelp('channelInfo');

class BroadcastAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.action.action.message,
      help: this.props.action.action.help,
      channelId: this.props.action.action.channel
    };
  }

  render() {
    return (
      <div>
        <div className="input-option">
          <label className="lbl">Message</label>
          <input className="in" type="text" value={this.state.message} onChange={this.updateMessage.bind(this)}/>
          <Help message={messageHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">Help Message</label>
          <input className="in" type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
          <Help message={helpMessageHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">Channel Id or Name (optional)</label>
          <input className="in" type="text" value={this.state.channelId} onChange={this.updateChannel.bind(this)}/>
          <Help message={channelInfoHelp} />
        </div>
      </div>
    );
  }

  updateMessage(event) {
    let message = event.target.value;

    this.props.action.action.message = message;

    this.setState({
      message: message
    });
  }

  updateHelp(event) {
    let help = event.target.value;

    this.props.action.action.help = help;

    this.setState({
      help: help
    });
  }

  updateChannel(event) {
    let channel = event.target.value;

    this.props.action.action.channel = channel;

    this.setState({
        channelId: channel
    });
  }
}

export default BroadcastAction;
