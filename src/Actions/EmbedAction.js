import React, { Component } from 'react';

class EmbedAction extends Component {
  constructor(props) {
    super(props);

    if (!this.props.action.embed) {
        this.props.action.embed = {};
    }

    let img = '';
    if (this.props.action.embed.image) {
        img = this.props.action.embed.image.url;
    }

    this.state = {
      title: this.props.action.embed.title,
      image: img,
      help: this.props.action.help
    };
  }

  render() {
    return (
      <div>
        <div>
          <label>Content Title</label>
          <input type="text" value={this.state.title} onChange={this.updateTitle.bind(this)}/>
        </div>
        <div>
          <label>Content Link</label>
          <input type="text" value={this.state.image} onChange={this.updateImage.bind(this)}/>
        </div>
        <div>
          <label>Help Message</label>
          <input type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
        </div>
      </div>
    );
  }

  updateTitle(event) {
    let title = event.target.value;

    this.props.action.embed.title = title;

    this.setState({
      title: title
    });
  }

  updateHelp(event) {
    let help = event.target.value;

    this.props.action.help = help;

    this.setState({
      help: help
    });
  }

  updateImage(event) {
    let img = event.target.value;

    this.props.action.embed.image.url = img;

    this.setState({
        image: img
    });
  }
}

export default EmbedAction;
