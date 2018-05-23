import {all} from 'redux-saga/effects'
import {watchAddNumber, watchGetPosts} from "./auth/testSaga"

const rootSaga = function* () {
	yield all([
		watchAddNumber(),
		watchGetPosts()
	])
};
export default rootSaga;