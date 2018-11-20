import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import General from './General';
import Actions from './Actions';
import Action from './Action';
import DeferedActions from './DeferedActions';
import Music from './Music';
import Security from './Security';

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
                <li><Link to="/deferedActions">Defered Actions</Link></li>
                <li><Link to="/music">Music</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
            <div className="content-area">
              <Route exact path="/" component={General}/>
              <Route exact path="/actions" component={Actions}/>
              <Route path="/actions/:id" component={Action}/>
              <Route path="/deferedActions" component={DeferedActions}/>
              <Route path="/music" component={Music}/>
              <Route path="/security" component={Security}/>
            </div>
          </div>
          <footer>
            <button>Generate</button>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
