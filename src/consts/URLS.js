import io from 'socket.io-client'

export const SOCKET_URL = 'http://89.42.210.20:9095';
export const REST_URL = 'http://restful.daneshboom.ir';

//Socket
export const SOCKET = io(SOCKET_URL);