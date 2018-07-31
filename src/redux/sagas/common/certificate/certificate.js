import types from "../../../actions/types";
import getCertificatesList from "./getObjectCertificates";
import {takeEvery} from "redux-saga/effects";

function* watchGetObjectCertificates() {
    yield takeEvery(types.COMMON.GET_OBJECT_CERTIFICATES, getCertificatesList)
}

export default {
    watchGetObjectCertificates
}