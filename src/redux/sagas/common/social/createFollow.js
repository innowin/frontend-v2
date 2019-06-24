import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call, select} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* createFollow(action) {
  const {formValues, followOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.CREATE_FOLLOW)
  const state = yield select()
  const translate = state.intl.messages
  try {
    yield fork(api.post, urls.COMMON.SOCIAL.FOLLOW, results.COMMON.SOCIAL.CREATE_FOLLOW, {follow_followed: formValues.follow_followed})
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW, payload: {data, followOwnerId}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create Follow Done'],
          },
        },
      },
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.CREATE_FOLLOW,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}