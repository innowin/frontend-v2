import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getCustomerByCustomerId(action) {
  const {payload} = action
  const {customerId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID)
  try {
    yield fork(api.get, urls.ORG.CUSTOMER, results.ORG.GET_CUSTOMER_BY_CUSTOMER_ID, customerId)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_CUSTOMER_BY_CUSTOMER_ID, payload: {data}})
    yield put({type: types.ENTITY.SET_FILE, payload: {data: data.customer_picture}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_CUSTOMER_BY_CUSTOMER_ID, payload: {message, customerId}})
  } finally {
    socketChannel.close()
  }
}