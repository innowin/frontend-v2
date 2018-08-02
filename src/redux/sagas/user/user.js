import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, fork, call, takeEvery, takeLatest} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - check username exist worker
function* usernameCheck(action) {
  alert("ooooooooo")
  const {payload} = action
  const {username, resolve, reject} = payload
  console.log("ssssssssss payload:", payload)
  const socketChannel = yield call(api.createSocketChannel, results.USER.USERNAME_CHECK)
  try {
    yield fork(api.post, urls.USER.USERNAME_CHECK, results.USER.USERNAME_CHECK, {username: username})
    const res = yield take(socketChannel)
    resolve(res)
  } catch (e) {
    const {message} = e
    reject(message)
  } finally {
    socketChannel.close()
  }
}

//2 - sign in worker
function* createUserPerson(action) {
}

//3 - Sign Out worker
function* createUserOrgan(action) {
}

/**********    %% WATCHERS %%    **********/
//1 - check username is exist already
export function* watchUSERNAME_CHECK() {
  yield takeEvery(types.USER.USERNAME_CHECK, usernameCheck)
}

//2 - sign out
export function* watchCreateUserPerson() {
  yield takeEvery(types.USER.CREATE_USER_PERSON, createUserPerson)
}

//3 - sign in error
export function* watchCreateUserOrgan() {
  yield takeEvery(types.USER.CREATE_USER_ORGAN, createUserOrgan)
}