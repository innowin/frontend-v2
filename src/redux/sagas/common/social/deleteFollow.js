import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteFollow(action) {
  const {followId, followOwnerId, followOwnerType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.DELETE_FOLLOW)
  try {
    yield fork(api.del, urls.COMMON.SOCIAL.FOLLOW, results.COMMON.SOCIAL.DELETE_FOLLOW, '', `${followId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW , payload:{followId, followOwnerType, followOwnerId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOW,
      payload: {followId, message}
    })
  } finally {
    socketChannel.close()
  }
}