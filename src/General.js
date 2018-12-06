import React, { Component } from 'react';
import {getGreeting, setGreeting, getToken, setToken} from './configManager';
import Help from './Help/Help';
import getHelp from './Help/helpProvider';

const tokenHelp = getHelp('token');
const greetingHelp = getHelp('greeting');

class General extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: getToken(),
      greeting: getGreeting()
    }
  }

  render() {
    return (
      <div>
        <h3>General options</h3>
        <div className="input-option">
          <label className="lbl">Token</label>
          <input type="text" value={this.state.token} onChange={this.tokenChanged.bind(this)} className="in"/>
          <Help message={tokenHelp}/>
        </div>
        <div className="input-option">
          <label className="lbl">Greeting</label>
          <input type="text" value={this.state.greeting} onChange={this.greetingChanged.bind(this)} className="in"/>
          <Help message={greetingHelp}/>
        </div>
      </div>
    );
  }

  greetingChanged(event) {
    setGreeting(event.target.value);

    this.setState({
      greeting: event.target.value
    });
  }

  tokenChanged(event) {
    setToken(event.target.value);

    this.setState({
      token: event.target.value
    });
  }
}

export default General;
