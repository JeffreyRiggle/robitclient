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

    sendMessage(event, message) {
        if (this.available) {
            ipcRenderer.send(event, message);
        }
    }

    subscribeEvent(event, callback) {
        if (this.available) {
            ipcRenderer.on(event, callback);
        }
    }

    unsubcribeEvent(event, callback) {
        if (this.available) {
            ipcRenderer.removeListener(event, callback);
        }
    }
}

export default new NativeService();