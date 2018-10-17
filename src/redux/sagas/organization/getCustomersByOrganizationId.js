import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getCustomersByOrganizationId(action) {
  const {payload} = action
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID)
  try {
    yield fork(api.get, urls.ORG.CUSTOMER, results.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID, `?customer_organization=${organizationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID, payload: {data, organizationId}})
    for (let customer of data) {
      yield put({type: types.ENTITY.SET_FILE, payload: {data: customer.customer_picture}})
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}