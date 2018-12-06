import React, { Component } from 'react';
import './RandomBroadcastAction.scss';

class RandomBroadcastAction extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      messages: this.props.action.action.messages,
      message: '',
      help: this.props.action.action.help,
      channelId: this.props.action.action.channel
    };
  }

  render() {
    return (
      <div>
        <div className="message-area">
          <div className="message-add">
            <label className="lbl">Messages</label>
            <input className="message-text" type="text" value={this.state.message} onChange={this.updateMessage.bind(this)}/>
            <button className="message-action" onClick={this.addMessage.bind(this)} disabled={!this.state.message}>Add Message</button>
          </div>
          <div className="message-list">
            {this.state.messages.map(message => {
                return (
                  <div className="message" key={message}>
                    <span className="txt">{message}</span><button onClick={this.removeMessage(message)}>Remove</button>
                  </div>
                );
            })}
          </div>
        </div>
        <div className="input-option">
          <label className="lbl">Help Message</label>
          <input className="in" type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
        </div>
        <div className="input-option">
          <label className="lbl">Channel Id or Name (optional)</label>
          <input className="in" type="text" value={this.state.channelId} onChange={this.updateChannel.bind(this)}/>
        </div>
      </div>
    );
  }

  updateMessage(event) {
    let message = event.target.value;

    this.setState({
      message: message
    });
  }

  addMessage() {
      this.props.action.action.messages.push(this.state.message);
      
      this.setState({
        messages: this.props.action.action.messages,
        message: ''
      });
  }

  removeMessage(message) {
    return () => {
        let ind = this.props.action.action.messages.indexOf(message);

        if (ind !== -1) {
            this.props.action.action.messages.splice(ind, 1);
        }

        this.setState({
            messages: this.props.action.action.messages
        });
    }
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

export default RandomBroadcastAction;
