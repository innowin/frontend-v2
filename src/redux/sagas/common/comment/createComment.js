import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call, select} from "redux-saga/effects"
import constants from 'src/consts/constants'
import uuid from "uuid"

export function* createComment(action) {

  const {formValues, parentId, commentParentType, getComments} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.COMMENT.CREATE_COMMENT)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.post, urls.COMMON.COMMENT, results.COMMON.COMMENT.CREATE_COMMENT, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.COMMENT.CREATE_COMMENT, payload: {data, parentId, commentParentType}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create Comment Done']
          }
        }
      }
    })
    yield put({type: types.COMMON.COMMENT.GET_COMMENT_BY_ID, payload: {commentId: data.id}})
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