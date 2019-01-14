import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call, select} from "redux-saga/effects"
import constants from "../../../consts/constants"
import uuid from "uuid"

export function* editExchange(action) {
  const {formValues} = action.payload;
  let exchange_id = formValues.exchange_id
  let state = yield select()
  let translate = state.intl.messages
  // alert(exchange_id)
  let values = {
    name: formValues.exchange_name,
    description: formValues.exchange_description,
    exchange_image: formValues.exchange_media,
    biography: formValues.exchange_biography
  }
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.EDIT_EXCHANGE)
  let data
  try {
    yield fork(
        api.patch,
        urls.EXCHANGE + `/${exchange_id}`,
        results.EXCHANGE.EDIT_EXCHANGE,
        values
    )
    data = yield take(socketChannel)
    // console.log('----saga >> edit exchange data is: ', data)
    yield put({type: types.SUCCESS.EXCHANGE.EDIT_EXCHANGE, payload: {data}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate["Edit Exchange Successful"]
          }
        }
      }
    })
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.EDIT_EXCHANGE,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}