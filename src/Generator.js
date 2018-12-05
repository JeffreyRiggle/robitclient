import React, {Component} from 'react';
import {saveConfig, loadConfig} from './configManager';
import './Generator.scss';

class Generator extends Component {
    render() {
        return (
            <div className="generator">
                <div className="button">
                    <label>
                        <span>Load</span>
                        <input type="file" onChange={this.fileSelected.bind(this)} className="loadfile" ref="input"/>
                    </label>
                </div>
                <button onClick={saveConfig}>Generate</button>
            </div>
        );
    }

    fileSelected(event, file) {
        loadConfig(event.target.files[0]);
    }
}

export default Generator;