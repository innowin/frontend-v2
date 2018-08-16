import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call, takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
export function* getExchangeIdentitiesByMemberIdentity(action) {
  const {identityId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY)
  try {
    yield fork(
      api.get,
      urls.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      results.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      `?identity_id=${identityId}`
    )
    const data = yield take(socketChannel)
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



/**********    %% WATCHERS %%    **********/

export function* watchGetExchangesByMemberIdentity() {
  yield takeEvery(types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, getExchangeIdentitiesByMemberIdentity)
}