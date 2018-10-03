import {verifyToken} from "./verifyToken"
import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {signIn, signOut} from "./auth"


/**********    %% WATCHERS %%    **********/

export function* watchSignIn() {
  yield takeEvery(types.AUTH.SIGN_IN, signIn)
}

export function* watchSignOut() {
  yield takeEvery(types.AUTH.SIGN_OUT, signOut)
}

export function* watchSignInError() {
  yield takeEvery(types.ERRORS.AUTH.SIGN_IN, signOut)
}

function* watchVerifyToken() {
  yield takeEvery(types.AUTH.VERIFY_TOKEN, verifyToken)
}

export default [
  watchSignIn(),
  watchSignInError(),
  watchSignOut(),
  watchVerifyToken(),
]