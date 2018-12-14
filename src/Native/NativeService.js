import {EventEmitter} from 'events';

let ipcRenderer;

if (window.require) {
    const electron = window.require('electron');
    ipcRenderer = electron.ipcRenderer;
}

class NativeService extends EventEmitter {
    constructor() {
        super();
        this._available = false;

        if (ipcRenderer) {
            this.setupIPCBridge();
        }
    }

    setupIPCBridge() {
        ipcRenderer.on('heartbeat', () => {
            this._available = true;

            this.emit(this.stateChanged, true);
        });

        ipcRenderer.send('healthcheck');
    }

    get available() {
        return this._available;
    }

    get stateChanged() {
        return 'stateChanged';
    }
}

export default new NativeService();