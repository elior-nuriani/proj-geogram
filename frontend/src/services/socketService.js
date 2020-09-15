import io from 'socket.io-client';
const BASE_URL = (process.env.NODE_ENV === 'production') ? '/' : '//localhost:5000';

export default {
    setup,
    terminate,
    on,
    off,
    emit
}

//client === socket
var client;

function setup() {
    client = io(BASE_URL);
}

function terminate() {
    client = null;
}

function on(eventName, cb) {
    return client.on(eventName, cb);
}

function off(eventName, cb) {
    return client.off(eventName, cb);
}

function emit(eventName, data) {
    return client.emit(eventName, data);
}