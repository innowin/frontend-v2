import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call, select} from "redux-saga/effects"
import constants from "src/consts/constants"
import uuid from 'uuid'

export function* createExchange(action) {
  const {formValues, finished} = action.payload;
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.CREATE_EXCHANGE)
  const state = yield select()
  const translate = state.intl.messages

  let data
  try {
    yield fork(
        api.post,
        urls.EXCHANGE,
        results.EXCHANGE.CREATE_EXCHANGE,
        formValues
    )
    data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.CREATE_EXCHANGE, payload: {data}})
    yield put({type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID, payload: {id: data.id}})

    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create exchange done']
          }
        }
      }
    })

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