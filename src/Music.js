import React, { Component } from 'react';
import {getAudioSources, addAudioSource, removeAudioSource} from './configManager';

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
      <div>
        <h3>Music Options</h3>
        <div>
          {this.state.folders.map(folder => {
            return (
              <div>
                <span>{folder}</span>
                <button onClick={this.removeFolder(folder)}>Remove</button>
              </div>
            )
          })}
          <input type="text" value={this.state.pendingFolder} onChange={this.updatePendingFolder.bind(this)} />
          <button onClick={this.addFolder.bind(this)}>Add Folder</button>
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
