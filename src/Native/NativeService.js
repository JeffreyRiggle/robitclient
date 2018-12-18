import {EventEmitter} from 'events';

let ipcRenderer;
let subscriptions = new Map();

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
        if (!this.available) {
            return;
        }

        ipcRenderer.send('request', {
            id: event, 
            data: message
        });
    }

    subscribeEvent(event, callback) {
        if (!this.available) {
            return;
        }

        let sub = subscriptions.get(event);

        if (!sub) {
            ipcRenderer.on(event, this._handleEvent(event).bind(this));
            subscriptions.set(event, [callback]);
        }
        else {
            sub.push(callback);
        }

        ipcRenderer.send('subscribe', event);
    }

    _handleEvent(event) {
        return (sender, message) => {
            let subs = subscriptions.get(event);

            if (!subs) {
                return;
            }
    
            subs.forEach(subscription => {
                subscription(message);
            });
        }
    }

    unsubcribeEvent(event, callback) {
        if (!this.available) {
            return;
        }

        let sub = subscriptions.get(event);

        if (!sub) {
            return;
        }

        let ind = sub.indexOf(callback);

        if (ind !== -1) {
            sub.splice(ind, 1);
        }

        if (sub.length !== 0) {
            return;
        }

        subscriptions.delete(event);
        ipcRenderer.removeListener(event, callback);
        ipcRenderer.send('unsubscribe', event);
    }
}

export default new NativeService();