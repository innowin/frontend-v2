import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteCertificate(action) {
  const {certificateId, certificateOwnerId, certificateOwnerType, certificateParentId, certificateParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.CERTIFICATE.DELETE_CERTIFICATE)
  try {
    yield fork(api.del, urls.COMMON.CERTIFICATE, results.COMMON.CERTIFICATE.DELETE_CERTIFICATE, '', `${certificateId}`)
    yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.CERTIFICATE.DELETE_CERTIFICATE ,
      payload:{certificateId, certificateOwnerId, certificateOwnerType, certificateParentId, certificateParentType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.CERTIFICATE.DELETE_CERTIFICATE,
      payload: {message, certificateId}
    })
  } finally {
    socketChannel.close()
  }
}