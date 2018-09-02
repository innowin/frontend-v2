import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"


export function* addToExchange(action){
  const payload = action.payload
  const {identityId,exchangeIdentity} = payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.ADD_TO_EXCHANGE)
  try {
    yield fork(api.post, urls.EXCHANGE.ADD_TO_EXCHANGE, results.EXCHANGE.ADD_TO_EXCHANGE,{exchange_identity_related_exchange :exchangeIdentity,exchange_identity_related_identity:identityId})
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.ADD_TO_EXCHANGE, payload: {request:data}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.EXCHANGE.ADD_TO_EXCHANGE, payload: {type: types.ERRORS.EXCHANGE.ADD_TO_EXCHANGE, error: message}})
  } finally {    
    socketChannel.close()
  }
}