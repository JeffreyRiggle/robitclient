import React, { Component } from 'react';
import {getAudioSources, addAudioSource, removeAudioSource} from './configManager';
import Help from './Help/Help';
import getHelp from './Help/helpProvider';
import './Music.scss';

const folderHelp = getHelp('folderHelp');

class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: getAudioSources(),
      pendingFolder: ''
    }
  }

  render() {
    return (
      <div className="music-options content-view">
        <h3>Music Options</h3>
        <div className="input-option">
          <input className="in" type="text" value={this.state.pendingFolder} onChange={this.updatePendingFolder.bind(this)} />
          <button onClick={this.addFolder.bind(this)}>Add Folder</button>
          <Help message={folderHelp}/>
        </div>
        <div className="item-list">
          {this.state.folders.map(folder => {
            return (
              <div className="item">
                <span className="txt">{folder}</span>
                <button onClick={this.removeFolder(folder)}>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  updatePendingFolder(event) {
    this.setState({
      pendingFolder: event.target.value
    });
  }

  addFolder() {
    addAudioSource(this.state.pendingFolder);

    this.setState({
      folders: getAudioSources(),
      pendingFolder: ''
    });
  }

  removeFolder(folder) {
    return () => {
      removeAudioSource(folder);

      this.setState({
        folders: getAudioSources()
      });
    }
  }
}

export default Music;
