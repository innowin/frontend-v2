import {call, fork, put, take} from "redux-saga/effects"
import api from "../../../../consts/api"
import results from "../../../../consts/resultName"
import urls from "../../../../consts/URLS"
import types from "../../../actions/types"
import client from "../../../../consts/client";


function* createObjectCertificate(action) { // action = {type, payload: {formValues, ownerId} }
  const identityId = client.getIdentityId()
  let {formValues, certificateOwnerId, certificateOwnerType} = action.payload
  const newCert = {
    ...formValues,
    certificate_identity: identityId
  }

  const dynamicResult = results.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE + newCert.title
  const socketChannel = yield call(api.createSocketChannel, dynamicResult)

  try {
    yield fork(api.post, urls.COMMON.CERTIFICATE, dynamicResult, newCert)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE, payload: {certificateOwnerType, certificateOwnerId, data}})
    yield put({type: types.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY, payload: {identityId, certificateOwnerId, certificateOwnerType}})

  } catch (error) {
    const {message} = error
    yield put({type: types.ERRORS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE, payload: {message}})

  } finally {
    socketChannel.close()
  }
}

export default createObjectCertificate