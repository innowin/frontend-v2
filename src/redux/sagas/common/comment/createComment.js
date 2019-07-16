import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call, select} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* createComment(action) {
  const {formValues, parentId, commentParentType} = action.payload
  const result = `${results.COMMON.COMMENT.CREATE_COMMENT}-${Math.random()}`
  const socketChannel = yield call(api.createSocketChannel, result)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.post, urls.COMMON.COMMENT, result, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.COMMENT.CREATE_COMMENT, payload: {data, parentId, commentParentType}})
    yield put({type: types.USER.GET_USER_BY_USER_ID, payload: {userId: data.comment_sender}})

    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create Comment Done'],
          },
        },
      },
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.COMMENT.CREATE_COMMENT,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}