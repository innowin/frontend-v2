import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types/index"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteExchangeMembership(action) {
  const {exchangeMembershipId, exchangeMembershipOwnerId, exchangeMembershipOwnerType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP)
  try {
    yield fork(api.del, urls.COMMON.EXCHANGE_MEMBERSHIP, results.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP, {}, `${exchangeMembershipId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
      payload: {exchangeMembershipId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}
    })
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}