import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteExchange(action) {
  const {id} = action.payload;
  // alert(exchange_id)
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.DELETE_EXCHANGE)
  let data
  try {
    yield fork(
        api.del,
        urls.EXCHANGE + `/${id}`,
        results.EXCHANGE.DELETE_EXCHANGE,
    )
    data = yield take(socketChannel)
    // console.log('----saga >> delete exchange data is: ', data)
    yield put({type: types.SUCCESS.EXCHANGE.DELETE_EXCHANGE, payload: {data,id}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.DELETE_EXCHANGE,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}