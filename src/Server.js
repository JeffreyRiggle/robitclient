import React, {Component} from 'react';
import nativeService from './Native/NativeService'

class Server extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starting: false,
            started: false,
            errored: false
        }

        this.boundServerState = this._serverStateChanged.bind(this);
        nativeService.subscribeEvent('serverstate', this.boundServerState);
    }

    componentWillUnmount() {
        nativeService.unsubcribeEvent('serverstate', this.boundServerState);
    }

    _serverStateChanged(event, state) {
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

    render() {
        return (
            <div>
                <h3>Server</h3>
                <button disabled={this.state.started || this.state.starting} onClick={this.startServer}>Start</button>
                <button disabled={!this.state.started}>Stop</button>
            </div>
        )
    }

    startServer() {
        nativeService.sendMessage('startserver');
    }
}

export default Server;