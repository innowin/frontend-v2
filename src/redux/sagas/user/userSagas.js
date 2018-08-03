import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, fork, call, takeLatest} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - check username exist worker

function* usernameCheck(action) {
  const {payload} = action
  const {username, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.USERNAME_CHECK)
  try {
    yield fork(api.post, urls.USER.USERNAME_CHECK, results.USER.USERNAME_CHECK, {username: username})
    const res = yield take(socketChannel)
    yield call(resolve, res)
  } catch (e) {
    const {message} = e
    yield call(reject, message)
  } finally {
    socketChannel.close()
  }
}


/**********    %% WATCHERS %%    **********/
//1 - check username is exist already
export function* watchUsernameCheck() {
  yield takeLatest(types.USER.USERNAME_CHECK, usernameCheck)
}

//
// //2 - watchCreateUserPerson
// export function* watchCreateUserPerson() {
//   yield takeEvery(types.USER.CREATE_USER_PERSON, createUserPerson)
// }
//
// //3 - watchCreateUserOrgan
// export function* watchCreateUserOrgan() {
//   yield takeEvery(types.USER.CREATE_USER_ORGAN, createUserOrgan)
// }