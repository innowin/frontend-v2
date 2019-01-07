import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call, select} from "redux-saga/effects"
import constants from "src/consts/constants";
import uuid from 'uuid'

export function* deleteExchange(action) {
  const {id} = action.payload;
  // alert(exchange_id)
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.DELETE_EXCHANGE)
  const state = yield select()
  const translate = state.intl.messages

  let data
  try {
    yield fork(
        api.del,
        urls.EXCHANGE + `/${id}`,
        results.EXCHANGE.DELETE_EXCHANGE,
    )
    data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.DELETE_EXCHANGE, payload: {data,id}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.WARNING,
          content: {
            text: translate['Exchange removed']
          }
        }
      }
    })
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