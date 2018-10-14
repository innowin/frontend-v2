import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getCommentsByParentId(action) {
  const {parentId, commentParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID)
  try {
    yield fork(api.get, urls.COMMON.COMMENT, results.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID, `?comment_parent=${parentId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID , payload:{data, parentId, commentParentType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}