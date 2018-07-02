import io from 'socket.io-client'

export const SOCKET_URL = 'http://socket.daneshboom.ir';
export const REST_URL = 'http://restful.daneshboom.ir';

//Socket
export const SOCKET = io(SOCKET_URL);

const urls =  {
	SIGN_IN : "api-token-auth",
	GET_ORGANIZATION : 'organization'
}
export default urls;