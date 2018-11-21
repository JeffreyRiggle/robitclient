import React, { Component } from 'react';

class HttpAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: this.props.action.method,
      url: this.props.action.url,
      body: this.props.body,
      help: this.props.action.help
    };
  }

  render() {
    return (
      <div>
        <div>
          <label>Method</label>
          <input type="text" value={this.state.method} onChange={this.updateMethod.bind(this)}/>
        </div>
        <div>
          <label>URL</label>
          <input type="text" value={this.state.url} onChange={this.updateURL.bind(this)}/>
        </div>
        <div>
          <label>Body</label>
          <textarea value={this.state.body} onChange={this.updateBody.bind(this)}/>
        </div>
        <div>
          <label>Help Message</label>
          <input type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
        </div>
      </div>
    );
  }

  updateMethod(event) {
    let method = event.target.value;
    this.props.action.method = method;

    this.setState({
      method: method
    });
  }

  updateBody(event) {
    let body = event.target.value;
    this.props.action.body = body;

    this.setState({
      body: body
    });
  }

  updateHelp(event) {
    let help = event.target.value;
    this.props.action.help = help;

    this.setState({
      help: help
    });
  }

  updateURL(event) {
    let url = event.target.value;
    this.props.action.url = url;

    this.setState({
        url: url
    });
  }
}

export default HttpAction;
