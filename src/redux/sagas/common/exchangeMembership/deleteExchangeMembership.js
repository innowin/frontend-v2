import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types/index'
import urls from 'src/consts/URLS'
import {put, take, fork, call, select} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* deleteExchangeMembership(action) {
  const {exchangeMembershipId, exchangeMembershipOwnerId} = action.payload
  const result = `${results.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP}-${exchangeMembershipId}`
  const socketChannel = yield call(api.createSocketChannel, result)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.del, urls.COMMON.EXCHANGE_MEMBERSHIP, result, {}, `${exchangeMembershipId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
      payload: {exchangeMembershipId, exchangeMembershipOwnerId},
    })

    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.WARNING,
          content: {
            text: translate['Exchange membership removed'],
          },
        },
      },
    })
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}
