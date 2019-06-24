import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call, select} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* deleteFollow(action) {
  const {followId, followOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.DELETE_FOLLOW)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.del, urls.COMMON.SOCIAL.FOLLOW, results.COMMON.SOCIAL.DELETE_FOLLOW, '', `${followId}`)
    yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW, payload: {followId, followOwnerId}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.WARNING,
          content: {
            text: translate['Delete Follow Done'],
          },
        },
      },
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOW,
      payload: {followId, message},
    })
  }
  finally {
    socketChannel.close()
  }
}