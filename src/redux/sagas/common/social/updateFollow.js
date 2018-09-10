import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateFollow(action) {
  const {followId, followOwnerId, formValues} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.UPDATE_FOLLOW)
  try {
    yield fork(api.patch, urls.COMMON.SOCIAL.UPDATE_FOLLOW, results.COMMON.SOCIAL.UPDATE_FOLLOW, formValues, `${followId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.UPDATE_FOLLOW , payload:{data, followId, followOwnerId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.UPDATE_FOLLOW,
      payload: {followId, message}
    })
  } finally {
    socketChannel.close()
  }
}