import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* getAllExchanges(action) {
  const {limit, offset} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGES)
  try {
    yield fork(
        api.get,
        urls.EXCHANGE,
        results.EXCHANGE.GET_EXCHANGES,
        `?limit=${limit}&offset=${offset}`
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGES, payload: {data}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERROR.EXCHANGE.GET_EXCHANGES,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}