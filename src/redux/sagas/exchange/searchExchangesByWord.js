import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* searchExchangesByWord(action) {
  let {searchWord} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.SEARCH_EXCHANGES_BY_WORD)
  try {
    yield fork(
        api.get,
        urls.EXCHANGE,
        results.EXCHANGE.SEARCH_EXCHANGES_BY_WORD,
        `?name=${searchWord}`
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.SEARCH_EXCHANGES_BY_WORD, payload: {data}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.SEARCH_EXCHANGES_BY_WORD,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}