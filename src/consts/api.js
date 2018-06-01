import {SOCKET,REST_URL} from "./URLS"
import {REST_REQUEST} from "./Events"


const get = (url , resultName, token) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL + '/' + url,
		result: resultName,
		token
	})
}

const post = (url , resultName ,data, token ) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'post',
		url: REST_URL+'/'+url,
		result: resultName,
		data,
		token
	})
}

const api = {
	get,
	post
}
export default api