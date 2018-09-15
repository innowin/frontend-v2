import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types/index"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"


export function* createExchangeMembership(action){
  const payload = action.payload
  const {identityId,exchangeIdentity} = payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP)
  try {
    yield fork(api.post, urls.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, results.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP,{exchange_identity_related_exchange :exchangeIdentity,exchange_identity_related_identity:identityId})
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, payload: {request:data}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, payload: {type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, error: message}})
  } finally {    
    socketChannel.close()
  }
}