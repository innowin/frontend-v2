import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import {call, fork, take, put} from "redux-saga/effects"
import types from "src/redux/actions/types"
import helpers from "src/consts/helperFunctions"

export function* getUserBadges(action) {
  const {userId, identityId} = action.payload
  yield put({type:types.COMMON.SET_BADGES_IN_USER, payload:{userId}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_USER_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_USER_BADGES, `?badge_related_parent=${identityId}`)
    const badges = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(badges)
    yield put({type: types.SUCCESS.COMMON.GET_USER_BADGES, payload: {data:normalData}})
    yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_USER, payload:{data:badges, userId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_USER, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}

export function* getOrganBadges(action) {
  const {organizationId} = action.payload
  yield put({type:types.COMMON.SET_BADGES_IN_ORG, payload:{organizationId}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_ORG_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_ORG_BADGES, `?badge_related_parent=${organizationId}`)
    const badges = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(badges)
    yield put({type: types.SUCCESS.COMMON.GET_ORG_BADGES, payload: {data:normalData}})
    yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_ORG, payload:{data:badges, organizationId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_ORG, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}


// function* getBadges(action) {
//   const {userId, relatedParentId, nextActionType} = action.payload
//   const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_USER_BADGES)
//   try {
//     yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_USER_BADGES, `?badge_related_parent=${identityId}`)
//     const badges = yield take(socketChannel)
//     const normalData = helpers.arrayToIdKeyedObject(badges)
//     yield put({type: types.SUCCESS.COMMON.GET_USER_BADGES, payload: {data:normalData}})
//     yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_USER, payload:{data:badges, userId}})
//   } catch (e) {
//     const {message} = e
//     yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_USER, payload: {message, userId}})
//   } finally {
//     socketChannel.close()
//   }
// }
//
// export default getBadges