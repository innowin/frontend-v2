import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getPostViewerCount(action) {
  const {postId} = action.payload
  const resultName = `${results.COMMON.POST.GET_POST_VIEWER_COUNT}-${postId}`
  const socketChannel = yield call(api.createSocketChannel, resultName)
  try {
    yield fork(api.getPostViewerCount, postId, resultName)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.POST.GET_POST_VIEWER_COUNT, payload:{data, postId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.SET_POST_VIEWER,
      payload: {message, postId}
    })
  } finally {
    socketChannel.close()
  }
}


export function* setPostViewer(action) {
  const {postId, getPostViewerCount} = action.payload
  const resultName = `${results.COMMON.POST.SET_POST_VIEWER}-${postId}`
  const socketChannel = yield call(api.createSocketChannel, resultName)
  try {
    yield fork(api.setPostViewer, postId, resultName)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.POST.SET_POST_VIEWER , payload:{data, postId}})
    getPostViewerCount(postId)
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.GET_POST_VIEWER_COUNT,
      payload: {message, postId}
    })
  } finally {
    socketChannel.close()
  }
}