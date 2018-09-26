import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateCertificate(action) {
  const {formValues, certificateId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.CERTIFICATE.UPDATE_CERTIFICATE)
  try {
    yield fork(api.patch, urls.COMMON.CERTIFICATE, results.COMMON.CERTIFICATE.UPDATE_CERTIFICATE, formValues, `${certificateId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.CERTIFICATE.UPDATE_CERTIFICATE , payload:{data, certificateId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.CERTIFICATE.UPDATE_CERTIFICATE,
      payload: {message, certificateId}
    })
  } finally {
    socketChannel.close()
  }
}