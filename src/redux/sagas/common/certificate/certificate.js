import {takeEvery} from "redux-saga/effects"
import types from "../../../actions/types"
import getCertificatesList from "./getObjectCertificates"
import createObjectCertificate from "./createObjectCertificate"
import resetCreatingObjectCertStatus from "./resetCreatingObjCertStatus"
import {getCertificatesByIdentity} from './getCertificatesByIdentity'
import {deleteCertificate} from './deleteCertificate'
import {updateCertificate} from './updateCertificate'


function* watchGetObjectCertificates() {
  yield takeEvery(types.COMMON.CERTIFICATE.GET_CERTIFICATES, getCertificatesList)
}

function* watchCreateObjectCertificate() {
  yield takeEvery(types.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE, createObjectCertificate)
}

function* watchResetCreatingObjectCertStatus() {
  yield takeEvery(types.COMMON.CERTIFICATE.RESET_CREATE_CERTIFICATE_STATUS, resetCreatingObjectCertStatus)
}

function* watchGetCertificatesByIdentity() {
  yield takeEvery(types.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY, getCertificatesByIdentity)
}

function* watchUpdateCertificate() {
  yield takeEvery(types.COMMON.CERTIFICATE.UPDATE_CERTIFICATE, updateCertificate)
}
function* watchDeleteCertificate() {
  yield takeEvery(types.COMMON.CERTIFICATE.DELETE_CERTIFICATE, deleteCertificate)
}


export default [
  watchGetObjectCertificates(),
  watchCreateObjectCertificate(),
  watchResetCreatingObjectCertStatus(),
  watchGetCertificatesByIdentity(),
  watchUpdateCertificate(),
  watchDeleteCertificate(),
]