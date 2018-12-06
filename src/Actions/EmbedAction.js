import React, { Component } from 'react';
import Help from '../Help/Help';
import getHelp from '../Help/helpProvider';

const titleHelp = getHelp('contentTitle');
const linkHelp = getHelp('linkHelp');
const helpMessageHelp = getHelp('helpMessage');

class EmbedAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.action.action.embed.title,
      image: this.props.action.action.embed.image.url,
      help: this.props.action.action.help
    };
  }

  render() {
    return (
      <div>
        <div className="input-option">
          <label className="lbl">Content Title</label>
          <input className="in" type="text" value={this.state.title} onChange={this.updateTitle.bind(this)}/>
          <Help message={titleHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">Content Link</label>
          <input className="in" type="text" value={this.state.image} onChange={this.updateImage.bind(this)}/>
          <Help message={linkHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">Help Message</label>
          <input className="in" type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
          <Help message={helpMessageHelp} />
        </div>
      </div>
    );
  }

  updateTitle(event) {
    let title = event.target.value;

    this.props.action.action.embed.title = title;

    this.setState({
      title: title
    });
  }

  updateHelp(event) {
    let help = event.target.value;

    this.props.action.action.help = help;

    this.setState({
      help: help
    });
  }

  updateImage(event) {
    let img = event.target.value;

    this.props.action.action.embed.image.url = img;

    this.setState({
        image: img
    });
  }
}

export default EmbedAction;
