import {SOCKET,REST_URL} from "./URLS"
import {REST_REQUEST} from "./Events"
import client from './client'
import {eventChannel} from 'redux-saga'

let token = client.getToken()

const createSocketChannel = (resultName) => {
	return eventChannel(emit => {
		const resultHandler = res => { 
			if(res.detail){
				emit(new Error(res.detail))
				return;
			}
			emit(res)
		}
		SOCKET.on(resultName,resultHandler)
		return () =>	SOCKET.off(resultName,resultHandler)
	})
}

const get = (url , resultName, query = "") => {
	let token = client.getToken()
	SOCKET.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL + '/' + url+'/'+ query,
		result: resultName,
		token
	})
}

const patch = (url , resultName ,data,query = "") => {
	SOCKET.emit(REST_REQUEST, {
		method: 'patch',
		url: REST_URL+'/'+url+'/'+ query,
		result: resultName,
		data,
		token
	})
}

<<<<<<< HEAD
const post = (url , resultName ,data,query = "") => {
	SOCKET.emit(REST_REQUEST, {
		method: 'post',
		url: REST_URL+'/'+url+'/'+ query,
=======
const post = (url ,query='', resultName ,data) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'post',
		url: REST_URL+'/'+url+'/'+query,
>>>>>>> 3a3a4db4bdfaa2d5a68350b139d57ff944dcae51
		result: resultName,
		data,
		token
	})
}
const api = {
	createSocketChannel,
	get,
<<<<<<< HEAD
	post,
	patch
=======
	post
>>>>>>> 3a3a4db4bdfaa2d5a68350b139d57ff944dcae51
}
export default api