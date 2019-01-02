import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteOrgCustomer(action) {
  const {customerId, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.DELETE_CUSTOMER)
  try {
    yield fork(api.del, urls.ORG.CUSTOMER, results.ORG.DELETE_CUSTOMER, '', `${customerId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.ORG.DELETE_CUSTOMER,
      payload: {customerId, organizationId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.ORG.DELETE_CUSTOMER,
      payload: {message, customerId}
    })
  } finally {
    socketChannel.close()
  }
}