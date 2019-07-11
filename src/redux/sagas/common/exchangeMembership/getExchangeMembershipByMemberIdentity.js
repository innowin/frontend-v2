import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types/index'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getExchangeMembershipByMemberIdentity(action) {
  const {exchangeMembershipOwnerId} = action.payload
  const result = `${results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY}-${Math.random()}`
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(
        api.get,
        urls.COMMON.EXCHANGE_MEMBERSHIP,
        result,
        `?identity_id=${exchangeMembershipOwnerId}`,
    )
    let data = yield take(socketChannel)

    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: data[i].exchange_identity_related_exchange.owner, userId: data[i].exchange_identity_related_exchange.owner.id}})
      data[i].exchange_identity_related_exchange.owner = data[i].exchange_identity_related_exchange.owner.id
      yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID, payload: {data: data[i].exchange_identity_related_exchange}})
      data[i].exchange_identity_related_exchange = data[i].exchange_identity_related_exchange.id
      data[i].exchange_identity_related_identity = data[i].exchange_identity_related_identity.id
    }

    yield put({
      type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {data, exchangeMembershipOwnerId},
    })

  }
  catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}
