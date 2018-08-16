import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call, takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - check username exist worker
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

//2 - get profile by userId worker
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

function* getIdentityByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_USER_IDENTITY)
  try {
    yield fork(api.get, urls.USER.GET_USER_IDENTITY, results.USER.GET_USER_IDENTITY, `?identity_user=${userId}`)
    const dataList = yield take(socketChannel)
    const data = dataList[0]
    yield put({type:types.SUCCESS.USER.GET_IDENTITY_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.USER.GET_IDENTITY_BY_USER_ID, payload:{message, userId}})
  } finally {
    socketChannel.close()
  }
}

/**********    %% WATCHERS %%    **********/

//1 - check username is exist already
export function* watchGetUserByUserId() {
  yield takeEvery(types.USER.GET_USER_BY_USER_ID, getUserByUserId)
}

//2 - get profile by userId
export function* watchGetProfileByUserId() {
  yield takeEvery(types.USER.GET_PROFILE_BY_USER_ID, getProfileByUserId)
}

//3 - get identity by userId
export function* watchGetIdentityByUserId() {
  yield takeEvery(types.USER.GET_IDENTITY_BY_USER_ID, getIdentityByUserId)
}