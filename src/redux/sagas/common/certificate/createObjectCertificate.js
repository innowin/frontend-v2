import {all, call, fork, put, take} from "redux-saga/effects"
import api from "../../../../consts/api"
import results from "../../../../consts/resultName"
import urls from "../../../../consts/URLS"
import types from "../../../actions/types"
import client from "../../../../consts/client";
import constants from '../../../../consts/constants'


function* createObjectCertificate(action) { // action = {type, payload: {formValues, ownerId} }
  const identityId = client.getIdentityId()
  let {formValues, certificateOwnerId, newFileIds} = action.payload
  const newCert = {
    ...formValues,
    certificate_identity: identityId
  }

  const dynamicResult = results.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE + newCert.title
  const socketChannel = yield call(api.createSocketChannel, dynamicResult)

  try {
    yield fork(api.post, urls.COMMON.CERTIFICATE, dynamicResult, newCert)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE, payload: {certificateOwnerId, data}})
    yield put({type: types.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY, payload: {identityId, certificateOwnerId}})

    if(newFileIds){
      yield all(newFileIds.map(fileId => {
        return fileId && put({
          type: types.COMMON.FILE.UPDATE_FILE,
          payload: {id: fileId, formData: {file_related_parent: data.id}, fileParentType: constants.FILE_PARENT.CERTIFICATE}
        })
      }))
    }

  } catch (error) {
    const {message} = error
    yield put({type: types.ERRORS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE, payload: {message}})

  } finally {
    socketChannel.close()
  }
}

export default createObjectCertificate