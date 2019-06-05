import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getCertificatesByIdentity(action) {
  const {identityId, certificateOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY)
  try {
    yield fork(api.get, urls.COMMON.CERTIFICATE, results.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY, `?certificate_parent=${identityId}`)
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY,
      payload: {data, identityId, certificateOwnerId}
    })
    for (let certificate of data) {
      if (certificate.certificate_picture)
        yield put({type: types.ENTITY.SET_FILE, payload: {data: certificate.certificate_picture}})
      if (certificate.certificate_logo)
        yield put({type: types.ENTITY.SET_FILE, payload: {data: certificate.certificate_logo}})
      if (certificate.certificate_organization) {
        yield put({
          type: types.USER.GET_USER_BY_USER_ID,
          payload: {userId: certificate.certificate_organization}
        })
      }
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