/* eslint-disable jsx-a11y/anchor-is-valid */
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
            data: '',
            serverTypes: []
        }

        this.boundServerState = this._serverStateChanged.bind(this);
        this.boundHealthState = this._healthChanged.bind(this);
        this.boundServerData = this._serverData.bind(this);

        client.subscribeEvent('serverstate', this.boundServerState);
        client.subscribeEvent('serverhealth', this.boundHealthState);
        client.subscribeEvent('serverdata', this.boundServerData);
    }

    componentDidMount() {
        client.sendMessage('serverTypes').then(types => {
            this.setState({
                serverTypes: types
            });
        });
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
                    { this.renderStart() }
                    <button disabled={!this.state.started} onClick={this.stopServer.bind(this)}>Stop</button>
                </div>
                { this.renderDetails() }
            </div>
        )
    }

    renderStart() {
        if (!this.state.serverTypes.length) {
            return <button disabled={this.state.started || this.state.starting} onClick={this.startServer('local')}>Start</button>
        }

        return (
            <span>
                <button 
                    disabled={this.state.started || this.state.starting} 
                    onClick={() => this.setState({serverSelect: !this.state.serverSelect})}
                >Start <i className="fas fa-caret-down"></i></button>
                { this.state.serverSelect &&
                  <ul className="popover">
                      {this.state.serverTypes.map(value => {
                          return <li key={value} className="popover-item"><a onClick={this.startServer(value)}>{value}</a></li>
                      })}
                  </ul>
                }
            </span>
        );
    }

    renderDetails() {
        if (this.state.starting) {
            return (
                <div className="server-details">
                    <h1>Starting</h1>
                    <div className="fa-4x">
                        <i className="fas fa-sync fa-spin"></i>
                    </div>
                </div>
            );
        }

        return (
            <div className="server-details">
                <h3>Health</h3>
                <div className="server-stats">
                    <p>Up Time: {this.state.upTime}</p>
                    { this.state.serverType === 'Local' && <p>Memory: {this.state.memoryUsage}</p> }
                    { this.state.serverType === 'Local' && <p>CPU Time: {this.state.cpuTime}</p> }
                </div>
                <h3>Data</h3>
                <textarea className="server-log" disabled={true} value={this.state.data}></textarea>
            </div>
        );
    }

    startServer(type) {
        return () => {
            client.sendMessage('startserver', {
                type: type,
                config: getConfig()
            }).then(() => {
                this._serverStateChanged('started');
            });

            this.setState({
                serverSelect: false,
                serverType: type
            });
        }
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