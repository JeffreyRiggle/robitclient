import React, {Component} from 'react';
import {client} from '@jeffriggle/ipc-bridge-client';
import {getConfig} from './configManager';

class Server extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starting: false,
            started: false,
            errored: false,
            memoryUsage: 'N/A',
            cpuTime: 'N/A',
            upTime: 'N/A'
        }

        this.boundServerState = this._serverStateChanged.bind(this);
        this.boundHealthState = this._healthChanged.bind(this);

        client.subscribeEvent('serverstate', this.boundServerState);
        client.subscribeEvent('serverhealth', this.boundHealthState);
    }

    componentWillUnmount() {
        client.unsubcribeEvent('serverstate', this.boundServerState);
    }

    _serverStateChanged(state) {
        if (state === 'stopped') {
            this.setState({
                starting: false,
                started: false,
                errored: false
            });
            return;
        }

        if (state === 'started') {
            this.setState({
                starting: false,
                started: true,
                errored: false
            });
            return;
        }
        
        if (state === 'error') {
            this.setState({
                starting: false,
                started: false,
                errored: true
            });
            return;
        }

        this.setState({
            starting: true,
            started: false,
            errored: false
        });
    }

    _healthChanged(state) {
        this.setState({
            memoryUsage: state.memory,
            cpuTime: state.cpu,
            upTime: state.upTime
        });
    }

    render() {
        return (
            <div>
                <h3>Server</h3>
                <button disabled={this.state.started || this.state.starting} onClick={this.startServer}>Start</button>
                <button disabled={!this.state.started} onClick={this.stopServer}>Stop</button>
                <div>
                    <h3>Health</h3>
                    <div>
                        <p>Up Time: {this.state.upTime}</p>
                        <p>Memory: {this.state.memoryUsage}</p>
                        <p>CPU Time: {this.state.cpuTime}</p>
                    </div>
                </div>
            </div>
        )
    }

    startServer() {
        client.sendMessage('startserver', getConfig());
    }

    stopServer() {
        client.sendMessage('stopserver');
    }
}

export default Server;