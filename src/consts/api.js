import {SOCKET,REST_URL} from "./URLS"
import {REST_REQUEST} from "./Events"
import client from './client'
import {eventChannel} from 'redux-saga'

let token = client.getToken()

const createSocketChannel = (resultName) => {
	return eventChannel(emit => {
		const resultHandler = res => { emit(res)}
		SOCKET.on(resultName,resultHandler)
		return () =>	SOCKET.off(resultName,resultHandler)
	})
}

const get = (url ,query='', resultName) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL + '/' + url+'/'+query,
		result: resultName,
		token
	})
}

const post = (url ,query='', resultName ,data) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'post',
		url: REST_URL+'/'+url+'/'+query,
		result: resultName,
		data,
		token
	})
}

const api = {
	createSocketChannel,
	get,
	post
}
export default api