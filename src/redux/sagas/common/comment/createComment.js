import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createComment(action) {

  const {formValues, parentId, commentParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.COMMENT.CREATE_COMMENT)
  try {
    yield fork(api.post, urls.COMMON.COMMENT, results.COMMON.COMMENT.CREATE_COMMENT, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.COMMENT.CREATE_COMMENT, payload: {data, parentId, commentParentType}})
    yield put({type: types.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID, payload: {parentId, commentParentType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.CREATE_COMMENT,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}