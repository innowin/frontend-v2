import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, fork, call, takeEvery, takeLatest} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - check username exist worker
function* usernameCheck(action) {
  const {payload} = action
  const {username, resolve, reject} = payload
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

//2 - create user person  worker
function* createUserPerson(action) {
  const {payload} = action
  const {formValues, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.CREATE_USER_PERSON)
  try {
    const {username, email, password} = formValues
    const data = {
      username,
      email,
      password
    }
    yield fork(api.post, urls.USER.CREATE_USER_PERSON, results.USER.CREATE_USER_PERSON, data)
    const res = yield take(socketChannel)
    resolve(res)
  } catch (e) {
    const {message} = e
    reject(message)
  } finally {
    socketChannel.close()
  }
}

//3 - create user organ worker
function* createUserOrgan(action) {
  const {payload} = action
  const {formValues, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.CREATE_USER_ORGAN)
  try {
    const {username, email, password} = formValues
    const data = {
      username,
      email,
      password,
      "organization.username": username,
      "organization.email": email,
      "organization.official_name": `${username}_official`
    }
    console.log("data organ is :", data)
    yield fork(api.post, urls.USER.CREATE_USER_ORGAN, results.USER.CREATE_USER_ORGAN, data)
    const res = yield take(socketChannel)
    resolve(res)
  } catch (e) {
    const {message} = e
    reject(message)
  } finally {
    socketChannel.close()
  }
}


/**********    %% WATCHERS %%    **********/
//1 - check username is exist already
export function* watchUsernameCheck() {
  yield takeLatest(types.USER.USERNAME_CHECK, usernameCheck)
}

//2 - watchCreateUserPerson
export function* watchCreateUserPerson() {
  yield takeEvery(types.USER.CREATE_USER_PERSON, createUserPerson)
}

//3 - watchCreateUserOrgan
export function* watchCreateUserOrgan() {
  yield takeEvery(types.USER.CREATE_USER_ORGAN, createUserOrgan)
}