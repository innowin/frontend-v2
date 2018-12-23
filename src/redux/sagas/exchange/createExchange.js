import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* createExchange(action) {
  const {formValues, finished} = action.payload;
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.CREATE_EXCHANGE)
  let data
  try {
    yield fork(
        api.post,
        urls.EXCHANGE,
        results.EXCHANGE.CREATE_EXCHANGE,
        formValues
    )
    data = yield take(socketChannel)
    console.log('----saga >> add exchange data is: ', data)
    yield put({type: types.SUCCESS.EXCHANGE.CREATE_EXCHANGE, payload: {data}})
    yield put({type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID, payload: {id: data.id}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.CREATE_EXCHANGE,
      payload: {message}
    })
  } finally {
    finished && finished(data)
    socketChannel.close()
  }
}