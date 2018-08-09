import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, fork, call, takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - create user person  worker
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

//2 - create user organ worker
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

//1 - watchCreateUserPerson
export function* watchCreateUserPerson() {
  yield takeEvery(types.USER.CREATE_USER_PERSON, createUserPerson)
}

//2 - watchCreateUserOrgan
export function* watchCreateUserOrgan() {
  yield takeEvery(types.USER.CREATE_USER_ORGAN, createUserOrgan)
}