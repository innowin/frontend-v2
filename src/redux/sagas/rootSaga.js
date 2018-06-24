import {all} from 'redux-saga/effects'
import {watchLoginFlow, watchSignInSuccess} from './auth/authSaga'

const rootSaga = function* () {
	yield all([
		watchAddNumber(),
		watchGetPosts(),
		watchLoginFlow(),
		watchSignInSuccess()
	])
};
export default rootSaga;