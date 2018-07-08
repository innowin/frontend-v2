import {takeEvery} from "redux-saga/effects";
import types from "../../actions/actionTypes";
import {getOrganization} from "../organization/organizationSaga";

export function* watchAddingTagOn() {
    yield takeEvery(types, getOrganization)
}

export function* watchAddingPriceFor() {
    yield takeEvery(types, getOrganization)
}

export function* watchCreateFileFor() {
    yield takeEvery(types, getOrganization)
}
