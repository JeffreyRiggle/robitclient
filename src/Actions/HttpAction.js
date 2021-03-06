import React, { Component } from 'react';
import Help from '../Help/Help';
import getHelp from '../Help/helpProvider';

const methodHelp = getHelp('apiMethod');
const urlHelp = getHelp('apiURL');
const bodyHelp = getHelp('apiBody');
const helpMessageHelp = getHelp('helpMessage');

class HttpAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: this.props.action.action.method,
      url: this.props.action.action.url,
      body: this.props.action.action.body,
      help: this.props.action.action.help
    };
  }

  render() {
    return (
      <div>
        <div className="input-option">
          <label className="lbl">Method</label>
          <input className="in" type="text" value={this.state.method} onChange={this.updateMethod.bind(this)}/>
          <Help message={methodHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">URL</label>
          <input className="in" type="text" value={this.state.url} onChange={this.updateURL.bind(this)}/>
          <Help message={urlHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">Body</label>
          <textarea className="in" value={this.state.body} onChange={this.updateBody.bind(this)}/>
          <Help message={bodyHelp} />
        </div>
        <div className="input-option">
          <label className="lbl">Help Message</label>
          <input className="in" type="text" value={this.state.help} onChange={this.updateHelp.bind(this)}/>
          <Help message={helpMessageHelp} />
        </div>
      </div>
    );
  }

  updateMethod(event) {
    let method = event.target.value;
    this.props.action.action.method = method;

    this.setState({
      method: method
    });
  }

  updateBody(event) {
    let body = event.target.value;
    this.props.action.action.body = body;

    this.setState({
      body: body
    });
  }

  updateHelp(event) {
    let help = event.target.value;
    this.props.action.action.help = help;

    this.setState({
      help: help
    });
  }

  updateURL(event) {
    let url = event.target.value;
    this.props.action.action.url = url;

    this.setState({
        url: url
    });
  }
}

export default HttpAction;
