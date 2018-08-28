import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deletePost(action) {
  const {postId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.DELETE_POST)
  try {
    yield fork(api.del, urls.COMMON.POST.DELETE_POST, results.COMMON.POST.DELETE_POST, '', `${postId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.POST.DELETE_POST , payload:{data, userId, postId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.DELETE_POST,
      payload: {message, postId}
    })
  } finally {
    socketChannel.close()
  }
}