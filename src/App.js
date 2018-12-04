import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import General from './General';
import Actions from './Actions';
import Action from './Action';
import DeferredActions from './DeferredActions';
import Music from './Music';
import Security from './Security';
import UserSecurity from './UserSecurity';
import Generator from './Generator';

import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h3>Robit Client</h3>
          </header>
          <div className="content">
            <div className="sidebar">
              <ul>
                <li><Link to="/">General</Link></li>
                <li><Link to="/actions">Actions</Link></li>
                <li><Link to="/deferredActions">Defered Actions</Link></li>
                <li><Link to="/music">Music</Link></li>
                <li><Link to="/security">Security</Link></li>
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
