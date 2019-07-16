import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call, select} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* deleteComment(action) {
  const {commentId, parentId, commentParentType} = action.payload
  const result = `${results.COMMON.COMMENT.DELETE_COMMENT}-${Math.random()}`
  const socketChannel = yield call(api.createSocketChannel, result)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.del, urls.COMMON.COMMENT, result, '', `${commentId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.COMMENT.DELETE_COMMENT,
      payload: {commentId, parentId, commentParentType},
    })
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.WARNING,
          content: {
            text: translate['Delete Comment Done'],
          },
        },
      },
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.DELETE_COMMENT,
      payload: {message, commentId},
    })
  }
  finally {
    socketChannel.close()
  }
}