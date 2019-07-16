import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getCommentsByParentId(action) {
  const {parentId, commentParentType, limit = 10, offset = 0} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID)
  try {
    yield fork(api.get, urls.COMMON.COMMENT, results.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID, `?comment_parent=${parentId}&limit=${limit}&offset=${offset}`, true)
    const data = yield take(socketChannel)
    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].comment_sender}, userId: data[i].comment_sender.id}})
      data[i].comment_sender = data[i].comment_sender.id
    }
    yield put({type: types.SUCCESS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID, payload: {data, parentId, commentParentType, limit}})
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}