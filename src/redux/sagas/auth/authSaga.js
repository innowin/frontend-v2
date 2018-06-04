import types from 'src/redux/actions/actionTypes'
import {put, takeEvery, call} from 'redux-saga/effects'


/**********    %% WORKERS %%    **********/
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
	yield takeEvery(types.SIGN_IN,signIn)
}

export function* watchGetPosts() {
	yield takeEvery(types.SIGN_IN_SUCCESS,signInSuccess)
}