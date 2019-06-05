import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getCommentById(action) {
  const {commentId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.COMMENT.GET_COMMENT_BY_ID + commentId)
  try {
    yield fork(api.get, urls.COMMON.COMMENT, results.COMMON.COMMENT.GET_COMMENT_BY_ID + commentId, `${commentId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.COMMENT.GET_COMMENT_BY_ID, payload: {data}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.GET_COMMENT_BY_ID,
      payload: {message, commentId}
    })
  } finally {
    socketChannel.close()
  }
}