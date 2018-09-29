import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createFollow(action) {

  const {formValues, followOwnerId, followOwnerType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.CREATE_FOLLOW)
  try {
    yield fork(api.post, urls.COMMON.SOCIAL.FOLLOW, results.COMMON.SOCIAL.CREATE_FOLLOW, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW, payload: {data, followOwnerId, followOwnerType}})
    //TODO: remove this at later when server response changed
    const followOwnerIdentity = formValues.follow_follower
    yield put({type: types.COMMON.SOCIAL.GET_FOLLOWERS, payload: {followOwnerIdentity, followOwnerId, followOwnerType}})
    yield put({type: types.COMMON.SOCIAL.GET_FOLLOWEES, payload: {followOwnerIdentity, followOwnerId, followOwnerType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.CREATE_FOLLOW,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}