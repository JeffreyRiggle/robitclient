import { Component } from 'react';
import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import General from './General';
import Actions from './Actions';
import Action from './Action';
import DeferredActions from './DeferredActions';
import Music from './Music';
import Security from './Security';
import UserSecurity from './UserSecurity';
import Generator from './Generator';
import {client} from '@jeffriggle/ipc-bridge-client';
import Server from './Server';
import Help from './Help/Help';
import getHelp from './Help/helpProvider';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.scss';

const downloadApp = getHelp('appDownload');

class App extends Component {
  constructor(props) {
    super(props);

    client.on(client.availableChanged, this.stateChanged.bind(this));

    this.state = {
      electron: client.available
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
            <div className="header-area">
              <h3>Robit Client</h3>
              {!this.state.electron && <div className="native-download">
                  <a href="https://s3.amazonaws.com/ilusr.com/apps/robitclientnative+Setup+1.0.0.exe" className="button">Get App</a>
                  <Help message={downloadApp}/>
                </div> }
            </div>
          </header>
          <div className="content">
            <div className="sidebar">
              <ul className="sidebar-list">
                <li><NavLink exact="true" to="/" className="sidebar-item">General</NavLink></li>
                <li><NavLink to="/actions" className="sidebar-item">Actions</NavLink></li>
                <li><NavLink to="/deferredActions" className="sidebar-item">Defered Actions</NavLink></li>
                <li><NavLink to="/music" className="sidebar-item">Music</NavLink></li>
                <li><NavLink to="/security" className="sidebar-item">Security</NavLink></li>
                {this.state.electron && <li><NavLink to="/server" className="sidebar-item">Server</NavLink></li>}
              </ul>
            </div>
            <div className="content-area">
              <Routes>
                <Route exact="true" path="/" Component={General}/>
                <Route exact="true" path="/actions" Component={Actions}/>
                <Route exact="true" path="/actions/:id" Component={Action}/>
                <Route path="/actions/:rootid/:id" Component={Action}/>
                <Route path="/deferred/action/:deferredid" Component={Action}/>
                <Route path="/deferredActions" Component={DeferredActions}/>
                <Route path="/music" Component={Music}/>
                <Route exact="true" path="/security" Component={Security}/>
                <Route exact="true" path="/security/:id" Component={UserSecurity}/>
                {this.state.electron && <Route exact="true" path="/server" Component={Server}/>}
              </Routes>
              <Outlet />
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
