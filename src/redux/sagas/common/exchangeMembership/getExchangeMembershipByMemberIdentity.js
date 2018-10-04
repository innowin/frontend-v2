import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types/index"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"
import helperFunctions from "src/consts/helperFunctions/helperFunctions"

export function* getExchangeMembershipByMemberIdentity(action) {
  const {identityId, exchangeMembershipOwnerType, exchangeMembershipOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY)
  try {
    yield fork(
        api.get,
        urls.COMMON.EXCHANGE_MEMBERSHIP,
        results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
        `?identity_id=${identityId}`
    )
    const data = yield take(socketChannel)
    const data1 = data.map(exchangeIdentity => (exchangeIdentity.exchange_identity_related_exchange))
    const data2 = helperFunctions.arrayToDefaultObject(data1)
    yield put({
      type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {exchangeData: data2, data, exchangeMembershipOwnerId, exchangeMembershipOwnerType, identityId}
    })
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}
