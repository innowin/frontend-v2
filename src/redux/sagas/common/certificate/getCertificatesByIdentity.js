import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getCertificatesByIdentity(action) {
  const {identityId, certificateOwnerId, certificateOwnerType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY)
  try {
    yield fork(api.get, urls.COMMON.CERTIFICATE, results.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY, `?certificate_identity=${identityId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY , payload:{data, identityId, certificateOwnerId, certificateOwnerType}})
    for(let certificate of data){
      yield put({type: types.COMMON.GET_FILE, payload: {fileId: certificate.certificate_picture}})
      yield put({type: types.COMMON.GET_FILE, payload: {fileId: certificate.certificate_logo}})
    }
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}