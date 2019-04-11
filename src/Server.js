import React, {Component} from 'react';
import {client} from '@jeffriggle/ipc-bridge-client';
import {getConfig} from './configManager';
import './Server.scss';

class Server extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starting: false,
            started: false,
            errored: false,
            memoryUsage: 'N/A',
            cpuTime: 'N/A',
            upTime: 'N/A',
            data: ''
        }

        this.boundServerState = this._serverStateChanged.bind(this);
        this.boundHealthState = this._healthChanged.bind(this);
        this.boundServerData = this._serverData.bind(this);

        client.subscribeEvent('serverstate', this.boundServerState);
        client.subscribeEvent('serverhealth', this.boundHealthState);
        client.subscribeEvent('serverdata', this.boundServerData);
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

    _serverData(data) {
        let newData = `${this.state.data} \r\n ${data}`;
        this.setState({
            data: newData
        });
    }

    render() {
        return (
            <div className="server-info">
                <h3>Server</h3>
                <div>
                    <button disabled={this.state.started || this.state.starting} onClick={this.startServer}>Start</button>
                    <button disabled={!this.state.started} onClick={this.stopServer.bind(this)}>Stop</button>
                </div>
                <div className="server-details">
                    <h3>Health</h3>
                    <div className="server-stats">
                        <p>Up Time: {this.state.upTime}</p>
                        <p>Memory: {this.state.memoryUsage}</p>
                        <p>CPU Time: {this.state.cpuTime}</p>
                    </div>
                    <h3>Data</h3>
                    <textarea className="server-log" disabled={true} value={this.state.data}></textarea>
                </div>
            </div>
        )
    }

    startServer() {
        client.sendMessage('startserver', getConfig());
    }

    stopServer() {
        client.sendMessage('stopserver').then(() => {
            this.setState({
                data: ''
            });
        });
    }
}

export default Server;