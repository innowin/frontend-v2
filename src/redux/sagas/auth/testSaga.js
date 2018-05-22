import types from 'src/redux/actions/actionTypes'
import {put, takeEvery, call} from 'redux-saga/effects'
const getPosts = url => {
	return fetch(url)
}


/**********    %% WORKERS %%    **********/
function* testSaga() {
	const msg = yield '**** I am a message from saga middleware ****'
	console.log(msg)
}

function* fetchPosts(action) {
	try {
		const res = yield call(getPosts,action.payload.url)
		const posts = yield res.json()
		yield put({ type: types.FETCH_SUCCEEDED,data:posts })
	} catch (error) {
		yield put({type: types.FETCH_FAILED, error})
	}
}


/**********    %% WATCHERS %%    **********/
export function* watchAddNumber() {
	yield takeEvery(types.ADD_NUMBER,testSaga)
}

export function* watchGetPosts() {
	yield takeEvery(types.FETCH_POSTS,fetchPosts)
}