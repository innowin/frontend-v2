import types from 'src/redux/actions/actionTypes'
import urls from 'src/consts/URLS'
import {delay} from 'redux-saga'
import {put,take, fork, apply,call, takeEvery} from 'redux-saga/effects'
import api from 'src/consts/api'
import client from 'src/consts/client'
import results from 'src/consts/resultName'

/**********    %% WORKERS %%    **********/

//1 - req -sending requests
function* sendRequest(username,password) {
	yield apply({}, api.post, [urls.SIGN_IN, results.SIGN_IN,{username,password}])
}
//1 - sign in worker
export function* signIn (action) {
	alert('inside sign in')
	const {payload} = action
	const {username ,password,remember} = payload
	const socketChannel = yield call(api.createSocketChannel, results.SIGN_IN)
	try {
		yield fork(sendRequest , username,password )
		while (true) {
			const data = yield take(socketChannel)
			if (remember) {
				yield client.setTokenLS(data.token)
			} else {
				yield client.setSessionLS(data.token)
			}
			yield delay(500)
			yield put({ type: types.SIGN_IN_SUCCESS, payload:{data , rememberMe:remember} })
		}
	} catch (e) {
		const {message} = e
		yield put({type:types.SIGN_IN_ERROR, payload:{type:types.ERRORS.SIGN_IN,message}})
	} finally {
		socketChannel.close()
	}
}
//Sign Out worker
export function* signOut () {
	yield call(client.clearToken)
	yield put({type:types.SIGN_OUT_FINISHED, payload:{}})
}

/**********    %% WATCHERS %%    **********/
//1 - sign In
export function* watchLSignIn() {
	yield takeEvery(types.SIGN_IN,signIn)
}

//2 - sign out
export function* watchLSignOut() {
	yield takeEvery(types.SIGN_OUT,signOut)
}

//3 - sign in error
export function* watchLSignInError() {
	yield takeEvery(types.SIGN_IN_ERROR,signOut)
}