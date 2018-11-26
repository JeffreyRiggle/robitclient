import React, {Component} from 'react';
import {saveConfig} from './configManager';

class Generator extends Component {
    render() {
        return (
            <div>
                <button onClick={saveConfig}>Generate</button>
            </div>
        );
    }
}

export default Generator;