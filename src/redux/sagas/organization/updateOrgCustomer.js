import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateOrgCustomer(action) {
  const {formValues, customerId, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_CUSTOMER)
  try {
    yield fork(api.patch, urls.ORG.CUSTOMER, results.ORG.UPDATE_CUSTOMER, formValues, `${customerId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.UPDATE_CUSTOMER , payload:{data, customerId, organizationId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.ORG.UPDATE_CUSTOMER,
      payload: {message, customerId}
    })
  } finally {
    socketChannel.close()
  }
}