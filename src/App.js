import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import General from './General';
import Actions from './Actions';
import Action from './Action';
import DeferredActions from './DeferredActions';
import Music from './Music';
import Security from './Security';
import UserSecurity from './UserSecurity';
import Generator from './Generator';
import nativeService from './Native/NativeService';
import Server from './Server';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    nativeService.on(nativeService.stateChanged, this.stateChanged.bind(this));

    this.state = {
      electron: nativeService.available
    }
  }

  stateChanged(state) {
    this.setState({
      electron: state
    });
  }

  render() {
    return (
      <BrowserRouter basename="/robit">
        <div className="App">
          <header>
            <h3>Robit Client</h3>
          </header>
          <div className="content">
            <div className="sidebar">
              <ul className="sidebar-list">
                <li><NavLink exact to="/" className="sidebar-item">General</NavLink></li>
                <li><NavLink to="/actions" className="sidebar-item">Actions</NavLink></li>
                <li><NavLink to="/deferredActions" className="sidebar-item">Defered Actions</NavLink></li>
                <li><NavLink to="/music" className="sidebar-item">Music</NavLink></li>
                <li><NavLink to="/security" className="sidebar-item">Security</NavLink></li>
                {this.state.electron && <li><NavLink to="/server" className="sidebar-item">Server</NavLink></li>}
              </ul>
            </div>
            <div className="content-area">
              <Route exact path="/" component={General}/>
              <Route exact path="/actions" component={Actions}/>
              <Route exact path="/actions/:id" component={Action}/>
              <Route path="/actions/:rootid/:id" component={Action}/>
              <Route path="/deferred/action/:deferredid" component={Action}/>
              <Route path="/deferredActions" component={DeferredActions}/>
              <Route path="/music" component={Music}/>
              <Route exact path="/security" component={Security}/>
              <Route exact path="/security/:id" component={UserSecurity}/>
              {this.state.electron && <Route exact path="/server" component={Server}/>}
            </div>
          </div>
          <footer>
            <Generator/>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
