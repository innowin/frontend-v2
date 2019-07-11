import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getExchangeMembershipByExchangeId(action) {
  const {exchangeId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID)
  try {
    yield fork(
        api.get,
        urls.COMMON.EXCHANGE_MEMBERSHIP,
        results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID,
        `?exchange_id=${exchangeId}`,
    )

    let data = yield take(socketChannel)

    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: data[i].exchange_identity_related_identity, userId: data[i].exchange_identity_related_identity.id}})
      data[i].exchange_identity_related_exchange.owner = data[i].exchange_identity_related_exchange.owner.id
      data[i].exchange_identity_related_identity = data[i].exchange_identity_related_identity.id
      data[i].exchange_identity_related_exchange = data[i].exchange_identity_related_exchange.id
    }

    yield put({
      type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID,
      payload: {data, exchangeId},
    })
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}