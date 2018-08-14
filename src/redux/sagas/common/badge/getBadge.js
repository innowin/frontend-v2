import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import {call, fork, take, put} from "redux-saga/effects"
import types from "src/redux/actions/types"
import helpers from "src/consts/helperFunctions"

export function* getUserBadges(action) {
  const {identityId, userId} = action.payload
  yield put({type:types.COMMON.SET_BADGES_IN_USER, payload:{userId}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_USER_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_USER_BADGES, `${identityId}`)
    const badges = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(badges)
    yield put({type: types.SUCCESS.COMMON.GET_USER_BADGES, payload: {data:normalData}})
    yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_USER, payload:{badges, userId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_USER, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}

export function* getOrganBadges(action) {
  const {organId} = action.payload
  yield put({type:types.COMMON.SET_BADGES_IN_ORG, payload:{organId}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_ORG_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_ORG_BADGES, `${organId}`)
    const badges = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(badges)
    yield put({type: types.SUCCESS.COMMON.GET_ORG_BADGES, payload: {data:normalData}})
    yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_ORG, payload:{badges, organId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_ORG, payload: {message, organId}})
  } finally {
    socketChannel.close()
  }
}