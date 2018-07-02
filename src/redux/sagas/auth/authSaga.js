import types from 'src/redux/actions/actionTypes'
import urls from 'src/consts/URLS'
import {put,take, fork,takeEvery, apply,call} from 'redux-saga/effects'
import api from 'src/consts/api'
import client from 'src/consts/client'
import results from 'src/consts/resultName'

/**********    %% WORKERS %%    **********/
//1 - req -sending requests
function* sendRequest(username,password) {
	yield apply({}, api.post, [urls.SIGN_IN, results.SIGN_IN,{username,password}])
}
//1 - sign in worker
export function* signIn (payload) {
	const {username ,password,remember} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.SIGN_IN)
	try {
		yield fork(sendRequest , username,password )
		while (true) {
			const data = yield take(socketChannel)
			yield put({ type: types.SIGN_IN_SUCCESS, payload:{data , rememberMe:remember} })
		}
	} catch (e) {
		const {message} = e
		yield put({type:types.SIGN_IN_ERROR, payload:{type:types.ERRORS.SIGN_IN,message}})
	} finally {
		socketChannel.close()
	}
}

//2 - sign in success
function signInSuccess(action) {
	const {rememberMe ,data} = action.payload
	const {token} = data
	rememberMe ? client.setTokenLS(token) : client.setSessionLS(token)
	console.log(rememberMe,data,'token is : ',client.getToken())
}

/**********    %% WATCHERS %%    **********/
//1 - sign in
export function* watchLoginFlow() {
	while(true) {
		const {payload} = yield take(types.SIGN_IN)
		yield call(signIn,payload)
		yield take([types.SIGN_OUT,types.SIGN_IN_ERROR])
		yield call(client.clearToken)
	}
}

//2 - sign in success
export function* watchSignInSuccess() {
	yield takeEvery(types.SIGN_IN_SUCCESS, signInSuccess)
}