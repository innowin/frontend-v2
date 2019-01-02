import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteComment(action) {
  const {commentId, parentId, commentParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.COMMENT.DELETE_COMMENT)
  try {
    yield fork(api.del, urls.COMMON.COMMENT, results.COMMON.COMMENT.DELETE_COMMENT, '', `${commentId}`)
    yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.COMMENT.DELETE_COMMENT ,
      payload:{commentId, parentId, commentParentType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.DELETE_COMMENT,
      payload: {message, commentId}
    })
  } finally {
    socketChannel.close()
  }
}