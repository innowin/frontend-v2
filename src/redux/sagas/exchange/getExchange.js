import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"
import helperFunctions from "src/consts/helperFunctions"


/**********    %% WORKERS %%    **********/

export function* getExchangeByExId(action) {
  const {Id} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGE)
  try {
    yield fork(
      api.get,
      urls.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
      results.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
      `?exchange_id=${Id}`
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, payload: {data}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}

export function* getExchangeMembersByExId(action) {
  const {Id} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID)
  try {
    yield fork(
      api.get,
      urls.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
      results.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
      `/${Id}`
    )
    const data = yield take(socketChannel)

    yield put({type: types.SUCCESS.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP, payload: {data}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}

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
    const data2 = data1.map(exchangeIdentity => (exchangeIdentity.exchange_identity_related_exchange))
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
