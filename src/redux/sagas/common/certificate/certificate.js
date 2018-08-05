import types from "../../../actions/types";
import getCertificatesList from "./getObjectCertificates";
import createObjectCertificate from "./createObjectCertificate"
import {takeEvery} from "redux-saga/effects";


function* watchGetObjectCertificates() {
    yield takeEvery(types.COMMON.GET_OBJECT_CERTIFICATES, getCertificatesList)
}

function* watchCreateObjectCertificate() {
    yield takeEvery(types.COMMON.CREATE_OBJECT_CERTIFICATE, createObjectCertificate)
}

export default {
    watchGetObjectCertificates,
    watchCreateObjectCertificate
}