import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {select, put, take, fork, call} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* createLike(action) {
  const {like_sender, like_parent} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.LIKE.CREATE_LIKE)
  const state = yield select()
  const translate = state.intl.messages
  try {
    yield fork(api.post, urls.COMMON.LIKE, results.COMMON.LIKE.CREATE_LIKE, {like_sender, like_parent})
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.LIKE.CREATE_LIKE,
      payload: {data},
    })

    if (data.id)
      yield put({
        type: types.TOAST.ADD_TOAST,
        payload: {
          data: {
            id: uuid(),
            type: constants.TOAST_TYPE.INFO,
            content: {
              text: translate['Create like done'],
            },
          },
        },
      })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.LIKE.CREATE_LIKE,
      payload: {like_parent},
    })
    yield put({
      type: types.ERRORS.COMMON.LIKE.CREATE_LIKE,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}