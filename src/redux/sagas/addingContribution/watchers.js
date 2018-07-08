import {takeEvery} from "redux-saga/effects";
import types from "../../actions/actionTypes";
import {getOrganization} from "../organization/organizationSaga";

export function* watchaddingProduct() {
    yield takeEvery(types.GET_ORGANIZATION, getOrganization)
}
