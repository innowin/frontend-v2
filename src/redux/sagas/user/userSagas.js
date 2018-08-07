import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call, takeEvery, takeLatest} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - check username exist worker
function* usernameCheck(action) {
  const {payload} = action
  const {username, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.USERNAME_CHECK)
  try {
    yield fork(api.post, urls.USER.USERNAME_CHECK, results.USER.USERNAME_CHECK, {username})
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

//4 - check username exist worker
function* getUserByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_USER_BY_USER_ID)
  try {
    yield fork(api.get, urls.USER.GET_USER_BY_USER_ID, results.USER.GET_USER_BY_USER_ID, `${userId}`)
    const data = yield take(socketChannel)
    yield put({type:types.SUCCESS.USER.GET_USER_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.USER.GET_USER_BY_USER_ID, payload:{message, userId}})
  } finally {
    socketChannel.close()
  }
}

//5 - get profile by userId worker
function* getProfileByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_PROFILE_BY_USER_ID)
  try {
    yield fork(api.get, urls.USER.GET_PROFILE_BY_USER_ID, results.USER.GET_PROFILE_BY_USER_ID, `?profile_user=${userId}`)
    const dataList = yield take(socketChannel)
    const data = dataList[0]
    yield put({type:types.SUCCESS.USER.GET_PROFILE_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.USER.GET_PROFILE_BY_USER_ID, payload:{message, userId}})
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

//4 - check username is exist already
export function* watchGetUserByUserId() {
  yield takeEvery(types.USER.GET_USER_BY_USER_ID, getUserByUserId)
}

//5 - get profile by userId
export function* watchGetProfileByUserId() {
  yield takeEvery(types.USER.GET_PROFILE_BY_USER_ID, getProfileByUserId)
}