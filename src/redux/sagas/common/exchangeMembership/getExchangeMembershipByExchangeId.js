import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* getExchangeMembershipByExchangeId(action) {
  const {id} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID)
  try {
    yield fork(
        api.get,
        urls.COMMON.EXCHANGE_MEMBERSHIP,
        results.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID,
        `${id}`
    )
    const data = yield take(socketChannel)

    yield put({type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID, payload: {data}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}