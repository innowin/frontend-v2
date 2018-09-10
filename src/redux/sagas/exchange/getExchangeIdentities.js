import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"
import helperFunctions from "src/consts/helperFunctions"

export function* getExchangeIdentitiesByMemberIdentity(action) {
  const {identityId, resolveFunc} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY)
  try {
    yield fork(
      api.get,
      urls.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      results.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      `?identity_id=${identityId}`
    )
    const data1 = yield take(socketChannel)
    const data2 = data1.map(exchangeIdentity => ({identity_id: exchangeIdentity.id,
      related_identity: exchangeIdentity.exchange_identity_related_identity,
      ...exchangeIdentity.exchange_identity_related_exchange}))
    if(resolveFunc)
      resolveFunc(data2[0].id)
    const data = helperFunctions.arrayToDefaultObject(data2)
    yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, payload: {data}})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      payload: {type: types.ERRORS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, message}
    })
  } finally {
    socketChannel.close()
  }
}
