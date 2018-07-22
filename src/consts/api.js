import {SOCKET, REST_URL} from "./URLS"
import {REST_REQUEST} from "./Events"
import client from './client'
import {eventChannel} from 'redux-saga'
import {apply} from "redux-saga/effects"

let token = client.getToken()

const createSocketChannel = (resultName) => {
	return eventChannel(emit => {
		const resultHandler = res => {
			if (res.detail) {
				emit(new Error(res.detail))
				return;
			}
			emit(res)
		}
		SOCKET.on(resultName, resultHandler)
		return () => SOCKET.off(resultName, resultHandler)
	})
}

//1 - req -sending requests
function* get(url, result, param = "") {
	yield apply({}, getEmit, [url, result, param])
}

function* post(url, result, data, param = "") {
	yield apply({}, postEmit, [url, result, data, param])
}

function* patch(url, result, data, param = "") {
	yield apply({}, patchEmit, [url, result, data, param])
}

function* del(url, result, data, param = "") {
	yield apply({}, delEmit, [url, result, data, param])
}

// pre send request
const getEmit = (url, resultName, query = "") => {
	let token = client.getToken()
	alert("inside get - api")
	console.log('url is ',url)
	console.log('result is ',resultName)
	console.log('query is ',query)
	console.log('token is ',token)
	SOCKET.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL + '/' + url + '/' + query,
		result: resultName,
		token
	})
}

const patchEmit = (url, resultName, data, query = "") => {
	SOCKET.emit(REST_REQUEST, {
		method: 'patch',
		url: REST_URL + '/' + url + '/' + query + '/',
		result: resultName,
		data,
		token
	})
}

const delEmit = (url, resultName, data, query = "") => {
	SOCKET.emit(REST_REQUEST, {
		method: 'del',
		url: REST_URL + '/' + url + '/' + query + '/',
		result: resultName,
		data,
		token
	})
}

const postEmit = (url, resultName, data, query = "") => {
	SOCKET.emit(REST_REQUEST, {
		method: 'post',
		url: REST_URL + '/' + url + '/' + query,
		result: resultName,
		data,
		token
	})
}

const api = {
	createSocketChannel,
	get,
	post,
	patch,
	del
}
export default api