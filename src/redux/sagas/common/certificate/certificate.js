import {takeEvery} from "redux-saga/effects"
import types from "../../../actions/types"
import getCertificatesList from "./getObjectCertificates"
import createObjectCertificate from "./createObjectCertificate"
import resetCreatingObjectCertStatus from "./resetCreatingObjCertStatus"


function* watchGetObjectCertificates() {
    yield takeEvery(types.COMMON.GET_CERTIFICATES, getCertificatesList)
}

function* watchCreateObjectCertificate() {
    yield takeEvery(types.COMMON.CREATE_OBJECT_CERTIFICATE, createObjectCertificate)
}

function* watchResetCreatingObjectCertStatus () {
    yield takeEvery(types.COMMON.RESET_CREATE_CERTIFICATE_STATUS, resetCreatingObjectCertStatus)
}

export default {
    watchGetObjectCertificates,
    watchCreateObjectCertificate,
    watchResetCreatingObjectCertStatus
}