import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createOrgCustomer(action) {
  const {formValues, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.CREATE_CUSTOMER)
  try {
    yield fork(api.post, urls.ORG.CUSTOMER, results.ORG.CREATE_CUSTOMER, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.CREATE_CUSTOMER, payload: {data, organizationId}})
    yield put({type: types.ORG.GET_CUSTOMER_BY_CUSTOMER_ID, payload: {customerId: data.id}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.ORG.CREATE_CUSTOMER,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}